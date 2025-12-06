# Footer 3D Interactive Logo Design

**Date**: 2025-12-06
**Status**: Approved
**Purpose**: Replace the static geometric pattern in the Footer CTA section with an interactive 3D spinning logo using Three.js

## Overview

Create an engaging, interactive 3D logo experience in the footer that responds to user drag interactions with physics-based momentum, featuring the Internkit logo on the front and a purple gradient on the back.

## User Experience

### Interaction Model
- **Drag-to-spin**: Users can click/touch and drag to manually rotate the logo
- **Momentum physics**: Logo continues spinning after release with slow decay (2-3 seconds)
- **Idle animation**: Gentle continuous rotation when not being interacted with
- **Smooth transitions**: Seamless transition from user control back to idle rotation

### Visual Presentation
- **Front face**: Internkit logo texture (`/public/logo.svg`)
- **Back face**: Animated purple gradient using brand colors
- **Lighting**: Ambient + directional lighting for depth
- **Quality**: High fidelity on desktop, optimized on mobile

## Technical Architecture

### Component Structure

```
app/components/
├── SpinningLogo3D.tsx         # Main 3D component (lazy-loaded)
└── SpinningLogoFallback.tsx   # Static fallback for errors/unsupported browsers
```

### Dependencies

```json
{
  "@react-three/fiber": "^8.x",
  "@react-three/drei": "^9.x",
  "three": "^0.160.x"
}
```

### Integration Pattern

**Footer.tsx** will use React lazy loading:

```tsx
const SpinningLogo3D = lazy(() => import('./SpinningLogo3D'));

// Replace geometric pattern with:
<Suspense fallback={<LoadingFallback />}>
  <ErrorBoundary fallback={<StaticLogoFallback />}>
    <SpinningLogo3D />
  </ErrorBoundary>
</Suspense>
```

## Implementation Details

### 3D Scene Configuration

**Canvas Setup**:
- Camera: Position `[0, 0, 5]`, FOV 50°
- Renderer: Antialiasing enabled, transparent background
- Pixel ratio: 1x mobile, up to 2x desktop

**Logo Mesh**:
- Geometry: `PlaneGeometry` (flat rectangle)
- Front material: `MeshStandardMaterial` with logo texture
- Back material: `ShaderMaterial` with purple gradient
- DoubleSide rendering enabled

**Lighting**:
- Ambient light for base visibility
- Directional light from top-right for dimension
- Reduced intensity on mobile for performance

### Interaction Physics

**Idle Rotation**:
```tsx
useFrame((state, delta) => {
  if (!isDragging) {
    meshRef.current.rotation.y += delta * 0.3;
  }
});
```

**Drag Implementation**:
1. Pointer down: Capture position, set dragging state
2. Pointer move: Calculate delta, apply to rotation
3. Pointer up: Capture velocity, start momentum decay

**Rotation Mapping**:
- Horizontal drag → Y-axis rotation (primary)
- Vertical drag → X-axis rotation (secondary)
- Desktop sensitivity: 1:1
- Mobile sensitivity: 0.5x (easier control)

**Momentum Decay**:
```tsx
velocity.current *= 0.95; // Per-frame decay
// Transition to idle when velocity < 0.01
```

### Responsive Design

**Sizing**:
- Mobile: `w-48 h-48` (192px)
- Tablet: `md:w-80 md:h-80` (320px)
- Desktop: `lg:w-96 lg:h-96` (384px)

Larger than current geometric pattern to emphasize interactivity on desktop.

**Desktop Features** (≥768px):
- Full drag interaction
- Higher pixel ratio (`dpr: [1, 2]`)
- Animated gradient shader
- Smooth shadows

**Mobile Optimizations** (<768px):
- Touch drag with reduced sensitivity
- Fixed `dpr: 1`
- Static gradient (no animation)
- Shadows disabled
- Touch event throttling (16ms)

### Performance Strategy

**Lazy Loading**:
- Component code-split to avoid initial bundle bloat
- Only loads when footer approaches viewport
- Uses `IntersectionObserver` or scroll position trigger

**Runtime Optimizations**:
- Texture loading with `useTexture` hook (caching)
- Conditional rendering based on device capabilities
- FPS monitoring: Reduce quality if drops below 30fps

### Error Handling

**Fallback Hierarchy**:

1. **Loading**: Animated pulse with static logo image
2. **WebGL unsupported**: Static logo image with same sizing
3. **Texture load failure**: Purple rectangle with "i" text
4. **Performance issues**: Auto-disable shadows/effects

**Error Boundary**:
```tsx
<ErrorBoundary fallback={<StaticLogoFallback />}>
  <Suspense fallback={<LoadingFallback />}>
    <SpinningLogo3D />
  </Suspense>
</ErrorBoundary>
```

**Static Fallback**:
```tsx
<div className="w-48 h-48 md:w-80 md:h-80 flex items-center justify-center">
  <img src="/logo.svg" alt="Internkit" className="w-32 h-32 md:w-48 md:h-48" />
</div>
```

### Accessibility

- `aria-label="Interactive 3D Internkit logo"` on canvas container
- Respects `prefers-reduced-motion` (disables auto-rotation)
- Keyboard support (optional enhancement): Arrow keys for rotation
- Touch-friendly hit targets

## Testing Considerations

1. **Desktop browsers**: Chrome, Firefox, Safari, Edge
2. **Mobile devices**: iOS Safari, Chrome Android
3. **Performance**: Monitor FPS, GPU usage
4. **Interaction**: Drag smoothness, momentum feel
5. **Fallbacks**: WebGL disabled, slow network
6. **Accessibility**: Keyboard navigation, reduced motion

## Success Metrics

- ✅ Smooth 60fps on desktop, 30fps minimum on mobile
- ✅ Three.js bundle lazy-loads (not in initial bundle)
- ✅ Graceful degradation to static image on errors
- ✅ Natural-feeling momentum and decay physics
- ✅ Maintains brand consistency (purple gradient, logo)

## Future Enhancements (Out of Scope)

- Particle effects on drag release
- Multiple logo variants cycling
- Parallax depth based on scroll position
- Sound effects on interaction
