import { ThreeElements } from '@react-three/fiber'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

export { }

declare module '*.glb'
declare module '*.png'

declare module 'meshline' {
  export const MeshLineGeometry: any
  export const MeshLineMaterial: any
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {
        meshLineGeometry: any
        meshLineMaterial: any
      }
    }
  }
}
