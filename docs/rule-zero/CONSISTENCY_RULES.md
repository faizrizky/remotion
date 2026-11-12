# RULE ZERO - Consistency rules (continuity QA)

Source: MattJr's review of the Part 1 draft v1 (12 Nov 2026). Seven continuity errors found by the viewer. Every rule below is a hard gate: a video is not delivered until the checklist at the bottom passes.

## The 7 findings and the rule each one created

| # | What was wrong (draft v1) | Rule | Fix in Part 1 |
|---|---|---|---|
| 1 | Monitor wall: several cameras showed near-identical garage views; CAM 2-B showed a car cut off at the frame edge (nonsense) | **CR-1** Every camera has its own view, registered once in the cam registry (below). A feed is a crop that makes sense as a fixed camera; never a random close-up of a prop or a car. Only the camera that covers the car's spot may show the car | 8 feeds re-cut; 2-B replaced; 3-S shows the closed door without the window |
| 2 | "PROBLEM 1" chip was a solid yellow rectangle, a different style from the CLOCK / NERVE / LOG pills | **CR-2** Every HUD element is one component family: dark pill, 2 px outline, mono label + mono value. Accent colour only changes the outline and the value (yellow = problem, red = broken rule). No second badge style | Chip is now a pill |
| 3 | Rule-sheet plate put the paper on the left wall while the booth's wall holds the monitors in every other plate | **CR-3** A set is built once. Every plate of the same location keeps the same layout of fixed objects (monitors, window, door, desk). A prop is placed where the layout has room (below the monitors) | Shot uses `booth_clean_sheet` (paper below the monitors); `rule_sheet_blank` retired |
| 4 | BAY 12 ring was tilted and misplaced | **CR-4** Overlays (rings, brackets, labels) are axis-aligned to the screen, centred on the object, and never inherit a plate flip. Use corner brackets, not a drawn ellipse | `Bracket` component; the Bay 12 plate is not mirrored |
| 5 | The "No brake lights" shot showed the sedan from a different angle and heading than the CCTV shots | **CR-5** One car, one pose per parking spot. A close-up of an object is a zoom into the same master plate (CCTV zoom), not a new angle, unless a new Gemini plate is generated from the master as reference | Shot is a CCTV zoom on the sedan's rear in the master plate |
| 6 | Logbook text did not follow the page (rows rise ~4 deg, columns lean) | **CR-6** Text overlaid on a plate follows that plate's own perspective: measure the ruled lines, rotate each string to the measured angle, centre it in its cell | `cellPos()` grid with measured lines and -4.2 deg rotation |
| 7 | At 11:02 the car had jumped forward and turned; at 11:00 it was parked further back | **CR-7** Continuity of position: an object that has not "moved" in the story must be at the same place, same scale and same heading in every shot of the same camera. The only car move allowed is the one the story logs (Bay 12 to Bay 31) | Headlights shot uses the master plate; only the lights change |

## Added after review 2 (12 Nov 2026)

| # | Finding | Rule |
|---|---|---|
| 8 | In the rewind the sedan appeared at Bay 12 nearer the camera, which read as the car backing up | **CR-8** A rewind never shows an object travelling against its heading. Run the clock back on the current spot, then stop at the old time with the object already parked at the old spot (same heading, same depth as the new spot) |
| 9 | Headlight glow floated in the air in front of the pillar | **CR-9** Light effects start at the light source (the lamp), are soft-edged, and land on surfaces (floor, pillar). No free-floating orbs, no hard-edged wedges |
| 10 | The sheet was drawn over the notes already pinned on the wall, and too big | **CR-10** A new prop goes on free space, at a believable size for the room; never over existing props |
| 11 | The red RULE 2 chip looked weaker than the earlier yellow one | **CR-11** Chips (PROBLEM n, RULE n) are filled yellow pills in the HUD family: same height, mono font, ink text on yellow. Red is reserved for the BROKEN stamp |

## Cam registry (Series 1, Level 3 garage)

| Cam | Covers | Source plate and crop | Notes |
|---|---|---|---|
| 1-A | Level 1 aisle toward the stairs | level3_wide_empty, left, ceiling | empty |
| 1-S | Level 1 stairwell door | stairwell_door | door ajar, light spill |
| 2-A | Level 2 aisle | level3_wide_empty, mirrored | empty |
| 2-B | Level 2 pillar row | level3_wide_empty, right | empty |
| 3-A | Level 3 main aisle (the car) | level3_wide_car (master) | the only feed with the sedan |
| 3-B | Level 3 far side | level3_wide_empty, mirrored right | empty |
| 3-S | Level 3 stairwell door, closed | driver_stairwell_glass_dale, left of the door | must not show the window or the Driver before the reveal |
| 4-A | Level 4 ceiling and beams | level3_wide_empty, top | empty |

The wall is a stopgap built from crops. For Part 2 onward, generate real, different plates for each camera (Gemini, master plate as reference) and replace the crops.

## Master plates (do not re-draw the same thing from another angle)

- Garage Level 3 wide: `level3_wide_empty` and `level3_wide_car`. Same camera; the sedan is parked at its Bay 31 spot, nose pointing away from the stairs (right).
- `level3_wide_car_bay12`: the same plate with the sedan parked at Bay 12 (cut-out from the master, same depth and heading, to the left of Bay 31). Used for the 10:00 PM rewind. Moves only between these two spots.
- Booth: `booth_clean` and `booth_clean_sheet` (paper below the monitors). Monitors on the wall right of the desk in every booth plate.

## Pre-delivery checklist (run on a contact sheet of every scene)

1. Each cam on a monitor wall: different view, makes sense, nothing cut off.
2. All HUD parts use the pill style.
3. Fixed objects of a location are in the same place as in the master plate.
4. Overlays are straight, centred, not mirrored.
5. Same object, same pose, same position across shots (car, door, chair, props).
6. Text on a prop follows the prop's perspective.
7. Nothing from the plot (the Driver, the figure, the eyes) is visible before its reveal.
8. Zoomed shots come from the master plate, not a different drawing.
