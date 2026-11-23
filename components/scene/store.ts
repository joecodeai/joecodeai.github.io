// Shared, mutable state read by the WebGL scene every frame. Written by scroll and pointer
// handlers; kept outside React so updates never trigger re-renders.
export const sceneState = {
  /** 0 = gathered into the eye, 1 = dispersed into the background field. */
  scatter: 0,
  /** 0 = eye sits to the side of the hero text, 1 = eye centred (contact section). */
  centre: 0,
  /** Pointer in normalised device coordinates (-1..1). */
  pointer: { x: 0, y: 0 },
  /** 0..1, raised when a call to action is hovered: the pupil dilates. */
  focus: 0,
  /** Brief pupil contraction on click. */
  flash: 0,
};
