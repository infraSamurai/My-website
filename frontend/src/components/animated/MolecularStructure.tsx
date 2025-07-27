"use client";
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Atom {
  id: string;
  position: [number, number, number];
  color: string;
  size: number;
  element: string;
  bonds: string[];
}

interface Bond {
  id: string;
  from: string;
  to: string;
  type: 'single' | 'double' | 'triple';
}

interface MolecularStructureProps {
  className?: string;
  molecule?: 'water' | 'methane' | 'benzene';
  interactive?: boolean;
  autoRotate?: boolean;
  showLabels?: boolean;
  scale?: number;
}

// Predefined molecular structures
const molecularData = {
  water: {
    atoms: [
      { id: 'O1', position: [0, 0, 0] as [number, number, number], color: '#EF4444', size: 0.8, element: 'O', bonds: ['H1', 'H2'] },
      { id: 'H1', position: [-1, 0.5, 0] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['O1'] },
      { id: 'H2', position: [1, 0.5, 0] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['O1'] }
    ],
    bonds: [
      { id: 'bond1', from: 'O1', to: 'H1', type: 'single' as const },
      { id: 'bond2', from: 'O1', to: 'H2', type: 'single' as const }
    ]
  },
  methane: {
    atoms: [
      { id: 'C1', position: [0, 0, 0] as [number, number, number], color: '#374151', size: 0.6, element: 'C', bonds: ['H1', 'H2', 'H3', 'H4'] },
      { id: 'H1', position: [1, 1, 1] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C1'] },
      { id: 'H2', position: [-1, -1, 1] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C1'] },
      { id: 'H3', position: [-1, 1, -1] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C1'] },
      { id: 'H4', position: [1, -1, -1] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C1'] }
    ],
    bonds: [
      { id: 'bond1', from: 'C1', to: 'H1', type: 'single' as const },
      { id: 'bond2', from: 'C1', to: 'H2', type: 'single' as const },
      { id: 'bond3', from: 'C1', to: 'H3', type: 'single' as const },
      { id: 'bond4', from: 'C1', to: 'H4', type: 'single' as const }
    ]
  },
  benzene: {
    atoms: [
      { id: 'C1', position: [2, 0, 0] as [number, number, number], color: '#374151', size: 0.6, element: 'C', bonds: ['C2', 'C6', 'H1'] },
      { id: 'C2', position: [1, 1.7, 0] as [number, number, number], color: '#374151', size: 0.6, element: 'C', bonds: ['C1', 'C3', 'H2'] },
      { id: 'C3', position: [-1, 1.7, 0] as [number, number, number], color: '#374151', size: 0.6, element: 'C', bonds: ['C2', 'C4', 'H3'] },
      { id: 'C4', position: [-2, 0, 0] as [number, number, number], color: '#374151', size: 0.6, element: 'C', bonds: ['C3', 'C5', 'H4'] },
      { id: 'C5', position: [-1, -1.7, 0] as [number, number, number], color: '#374151', size: 0.6, element: 'C', bonds: ['C4', 'C6', 'H5'] },
      { id: 'C6', position: [1, -1.7, 0] as [number, number, number], color: '#374151', size: 0.6, element: 'C', bonds: ['C5', 'C1', 'H6'] },
      { id: 'H1', position: [3, 0, 0] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C1'] },
      { id: 'H2', position: [1.5, 2.6, 0] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C2'] },
      { id: 'H3', position: [-1.5, 2.6, 0] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C3'] },
      { id: 'H4', position: [-3, 0, 0] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C4'] },
      { id: 'H5', position: [-1.5, -2.6, 0] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C5'] },
      { id: 'H6', position: [1.5, -2.6, 0] as [number, number, number], color: '#F8F9FA', size: 0.4, element: 'H', bonds: ['C6'] }
    ],
    bonds: [
      { id: 'bond1', from: 'C1', to: 'C2', type: 'single' as const },
      { id: 'bond2', from: 'C2', to: 'C3', type: 'double' as const },
      { id: 'bond3', from: 'C3', to: 'C4', type: 'single' as const },
      { id: 'bond4', from: 'C4', to: 'C5', type: 'double' as const },
      { id: 'bond5', from: 'C5', to: 'C6', type: 'single' as const },
      { id: 'bond6', from: 'C6', to: 'C1', type: 'double' as const },
      { id: 'bondH1', from: 'C1', to: 'H1', type: 'single' as const },
      { id: 'bondH2', from: 'C2', to: 'H2', type: 'single' as const },
      { id: 'bondH3', from: 'C3', to: 'H3', type: 'single' as const },
      { id: 'bondH4', from: 'C4', to: 'H4', type: 'single' as const },
      { id: 'bondH5', from: 'C5', to: 'H5', type: 'single' as const },
      { id: 'bondH6', from: 'C6', to: 'H6', type: 'single' as const }
    ]
  }
};

function MoleculeViewer({ 
  atoms, 
  bonds, 
  autoRotate, 
  showLabels, 
  scale,
  interactive,
  onAtomClick 
}: {
  atoms: Atom[];
  bonds: Bond[];
  autoRotate: boolean;
  showLabels: boolean;
  scale: number;
  interactive: boolean;
  onAtomClick?: (atom: Atom) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredAtom, setHoveredAtom] = useState<string | null>(null);

  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Bonds */}
      {bonds.map((bond) => {
        const fromAtom = atoms.find(a => a.id === bond.from);
        const toAtom = atoms.find(a => a.id === bond.to);
        
        if (!fromAtom || !toAtom) return null;

        const bondLines = [];
        
        if (bond.type === 'single') {
          bondLines.push(
            <mesh key={bond.id} position={[
              (fromAtom.position[0] + toAtom.position[0]) / 2,
              (fromAtom.position[1] + toAtom.position[1]) / 2,
              (fromAtom.position[2] + toAtom.position[2]) / 2
            ]}>
              <cylinderGeometry args={[0.05, 0.05, 
                Math.sqrt(
                  Math.pow(toAtom.position[0] - fromAtom.position[0], 2) +
                  Math.pow(toAtom.position[1] - fromAtom.position[1], 2) +
                  Math.pow(toAtom.position[2] - fromAtom.position[2], 2)
                )
              ]} />
              <meshStandardMaterial color="#6B7280" />
            </mesh>
          );
        } else if (bond.type === 'double') {
          const offset = 0.1;
          bondLines.push(
            <mesh key={`${bond.id}-1`} position={[
              (fromAtom.position[0] + toAtom.position[0]) / 2 + offset,
              (fromAtom.position[1] + toAtom.position[1]) / 2,
              (fromAtom.position[2] + toAtom.position[2]) / 2
            ]}>
              <cylinderGeometry args={[0.03, 0.03, 
                Math.sqrt(
                  Math.pow(toAtom.position[0] - fromAtom.position[0], 2) +
                  Math.pow(toAtom.position[1] - fromAtom.position[1], 2) +
                  Math.pow(toAtom.position[2] - fromAtom.position[2], 2)
                )
              ]} />
              <meshStandardMaterial color="#6B7280" />
            </mesh>,
            <mesh key={`${bond.id}-2`} position={[
              (fromAtom.position[0] + toAtom.position[0]) / 2 - offset,
              (fromAtom.position[1] + toAtom.position[1]) / 2,
              (fromAtom.position[2] + toAtom.position[2]) / 2
            ]}>
              <cylinderGeometry args={[0.03, 0.03, 
                Math.sqrt(
                  Math.pow(toAtom.position[0] - fromAtom.position[0], 2) +
                  Math.pow(toAtom.position[1] - fromAtom.position[1], 2) +
                  Math.pow(toAtom.position[2] - fromAtom.position[2], 2)
                )
              ]} />
              <meshStandardMaterial color="#6B7280" />
            </mesh>
          );
        }
        
        return bondLines;
      })}

      {/* Atoms */}
      {atoms.map((atom) => (
        <group key={atom.id} position={atom.position}>
          <Sphere
            args={[atom.size, 32, 32]}
            onClick={interactive ? () => onAtomClick?.(atom) : undefined}
            onPointerOver={() => setHoveredAtom(atom.id)}
            onPointerOut={() => setHoveredAtom(null)}
          >
            <meshStandardMaterial
              color={atom.color}
              emissive={hoveredAtom === atom.id ? atom.color : '#000000'}
              emissiveIntensity={hoveredAtom === atom.id ? 0.2 : 0}
              roughness={0.3}
              metalness={0.1}
            />
          </Sphere>
          
          {showLabels && (
            <Text
              position={[0, atom.size + 0.5, 0]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {atom.element}
            </Text>
          )}
        </group>
      ))}
    </group>
  );
}

export default function MolecularStructure({
  className = '',
  molecule = 'water',
  interactive = false,
  autoRotate = true,
  showLabels = false,
  scale = 1
}: MolecularStructureProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedAtom, setSelectedAtom] = useState<Atom | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAtomClick = (atom: Atom) => {
    if (interactive) {
      setSelectedAtom(atom);
    }
  };

  if (!isClient) {
    return <div className={`w-full h-full ${className}`} />;
  }

  const data = molecularData[molecule as keyof typeof molecularData] || molecularData.water;

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} />
        
        <MoleculeViewer
          atoms={data.atoms}
          bonds={data.bonds}
          autoRotate={autoRotate}
          showLabels={showLabels}
          scale={scale}
          interactive={interactive}
          onAtomClick={handleAtomClick}
        />
      </Canvas>
      
      {/* Info panel for selected atom */}
      {interactive && selectedAtom && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg">
          <h3 className="font-bold text-sm">Element: {selectedAtom.element}</h3>
          <p className="text-xs">Position: ({selectedAtom.position.map(p => p.toFixed(2)).join(', ')})</p>
          <p className="text-xs">Bonds: {selectedAtom.bonds.length}</p>
        </div>
      )}
    </div>
  );
}