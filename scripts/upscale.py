"""Credit: model weights realesr-general-x4v3 from Real-ESRGAN (xinntao/Real-ESRGAN, BSD-3-Clause), converted to npz.
Real-ESRGAN realesr-general-x4v3 (SRVGGNetCompact) in numpy, no torch.
usage: python3 upscale.py in.png out.png [scale=2|4] [weights.npz]"""
import sys, numpy as np, cv2
def conv(x,w,b):  # x HxWxC, w OxIx3x3
    H,W,C=x.shape; p=np.pad(x,((1,1),(1,1),(0,0)),mode='edge')
    cols=np.lib.stride_tricks.sliding_window_view(p,(3,3),axis=(0,1))  # H,W,C,3,3
    cols=cols.reshape(H*W,C*9)
    return (cols@w.reshape(w.shape[0],-1).T+b).reshape(H,W,-1).astype(np.float32)
def prelu(x,a): return np.where(x>0,x,x*a)
def run(x,P):
    y=prelu(conv(x,P['body_0_weight'],P['body_0_bias']),P['body_1_weight'])
    for i in range(2,66,2):
        y=prelu(conv(y,P[f'body_{i}_weight'],P[f'body_{i}_bias']),P[f'body_{i+1}_weight'])
    y=conv(y,P['body_66_weight'],P['body_66_bias'])
    H,W,_=y.shape; r=4
    y=y.reshape(H,W,3,r,r).transpose(0,3,1,4,2).reshape(H*r,W*r,3)
    return y+np.repeat(np.repeat(x,r,0),r,1)
def main():
    a=sys.argv; sc=int(a[3]) if len(a)>3 else 2; wp=a[4] if len(a)>4 else __file__.replace('upscale.py','models/realesr_general_x4v3.npz')
    P=dict(np.load(wp)); img=cv2.imread(a[1],cv2.IMREAD_UNCHANGED)
    alpha=img[:,:,3] if img.ndim==3 and img.shape[2]==4 else None
    x=cv2.cvtColor(img[:,:,:3],cv2.COLOR_BGR2RGB).astype(np.float32)/255
    H,W,_=x.shape; T=128; pad=8; out=np.zeros((H*4,W*4,3),np.float32)
    for y0 in range(0,H,T):
        for x0 in range(0,W,T):
            ya,xa=max(0,y0-pad),max(0,x0-pad); yb,xb=min(H,y0+T+pad),min(W,x0+T+pad)
            o=run(x[ya:yb,xa:xb],P)
            oy,ox=(y0-ya)*4,(x0-xa)*4; h,w=min(T,H-y0)*4,min(T,W-x0)*4
            out[y0*4:y0*4+h,x0*4:x0*4+w]=o[oy:oy+h,ox:ox+w]
    out=np.clip(out,0,1)
    if sc!=4: out=cv2.resize(out,(W*sc,H*sc),interpolation=cv2.INTER_AREA)
    o8=cv2.cvtColor((out*255+0.5).astype(np.uint8),cv2.COLOR_RGB2BGR)
    if alpha is not None:
        o8=np.dstack([o8,cv2.resize(alpha,(W*sc,H*sc),interpolation=cv2.INTER_CUBIC)])
    cv2.imwrite(a[2],o8)
if __name__=='__main__': main()
