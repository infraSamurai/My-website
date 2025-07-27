"use client";
import { motion, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'sports' | 'arts' | 'leadership' | 'community';
  level: number; // 1-3 (height on tree)
  students: string[];
  date: string;
  icon: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Math Olympiad Winner',
    description: 'Regional mathematics competition champion',
    category: 'academic',
    level: 3,
    students: ['Rahul K.', 'Priya S.'],
    date: '2024',
    icon: '🏆'
  },
  {
    id: '2', 
    title: 'Young Artist Award',
    description: 'Best painting in state-level art competition',
    category: 'arts',
    level: 2,
    students: ['Ananya M.'],
    date: '2024',
    icon: '🎨'
  },
  {
    id: '3',
    title: 'Cricket Champions',
    description: 'Inter-school cricket tournament winners',
    category: 'sports',
    level: 1,
    students: ['Team Captain: Arjun P.'],
    date: '2024',
    icon: '🏏'
  },
  {
    id: '4',
    title: 'Science Fair Innovation',
    description: 'Best science project - Solar Water Purifier',
    category: 'academic',
    level: 2,
    students: ['Meera L.', 'Dev K.'],
    date: '2024',
    icon: '🔬'
  },
  {
    id: '5',
    title: 'Community Service Star',
    description: '100+ hours of community service',
    category: 'community',
    level: 1,
    students: ['Kavya R.'],
    date: '2024',
    icon: '🌟'
  },
  {
    id: '6',
    title: 'Debate Competition Winner',
    description: 'District-level debate championship',
    category: 'leadership',
    level: 3,
    students: ['Aditya N.'],
    date: '2024',
    icon: '🎤'
  }
];

const categoryColors = {
  academic: '#8B7355',
  sports: '#4A7C59', 
  arts: '#F8BBD9',
  leadership: '#9CAF88',
  community: '#D4AF37'
};

// Space Colonization Algorithm for realistic branches
interface Point {
  x: number;
  y: number;
}

interface Node extends Point {
  parent?: Node;
  children: Node[];
  thickness: number;
}

interface Attractor extends Point {
  reached: boolean;
}

class OrganicTree {
  private nodes: Node[] = [];
  private attractors: Attractor[] = [];
  private readonly attractionDistance = 60;
  private readonly stepSize = 5;
  private readonly branchingAngle = 25;

  constructor(private rootX: number, private rootY: number) {
    // Create root node
    this.nodes.push({
      x: rootX,
      y: rootY,
      children: [],
      thickness: 1
    });

    // Generate attractors (where leaves will grow)
    this.generateAttractors();
  }

  private generateAttractors() {
    const attractorCount = achievements.length + 3; // Extra for natural branching
    
    for (let i = 0; i < attractorCount; i++) {
      this.attractors.push({
        x: this.rootX + (Math.random() - 0.5) * 300,
        y: this.rootY - 50 - Math.random() * 200,
        reached: false
      });
    }
  }

  grow(): Node[] {
    for (let iteration = 0; iteration < 50; iteration++) {
      const newNodes: Node[] = [];

      // For each node, find closest attractor
      for (const node of this.nodes) {
        let closestAttractor: Attractor | null = null;
        let closestDistance = Infinity;

        for (const attractor of this.attractors) {
          if (attractor.reached) continue;

          const distance = Math.sqrt(
            Math.pow(attractor.x - node.x, 2) + Math.pow(attractor.y - node.y, 2)
          );

          if (distance < this.attractionDistance && distance < closestDistance) {
            closestDistance = distance;
            closestAttractor = attractor;
          }
        }

        // Grow towards attractor
        if (closestAttractor) {
          const angle = Math.atan2(
            closestAttractor.y - node.y,
            closestAttractor.x - node.x
          );

          // Add some organic randomness
          const organicAngle = angle + (Math.random() - 0.5) * 0.3;

          const newNode: Node = {
            x: node.x + Math.cos(organicAngle) * this.stepSize,
            y: node.y + Math.sin(organicAngle) * this.stepSize,
            parent: node,
            children: [],
            thickness: 1
          };

          node.children.push(newNode);
          newNodes.push(newNode);

          // Check if attractor is reached
          const newDistance = Math.sqrt(
            Math.pow(closestAttractor.x - newNode.x, 2) + 
            Math.pow(closestAttractor.y - newNode.y, 2)
          );

          if (newDistance < 5) {
            closestAttractor.reached = true;
          }
        }
      }

      this.nodes.push(...newNodes);

      // Stop if no new growth
      if (newNodes.length === 0) break;
    }

    // Calculate thickness based on branch hierarchy
    this.calculateThickness();

    return this.nodes;
  }

  private calculateThickness() {
    const calculateNodeThickness = (node: Node): number => {
      if (node.children.length === 0) {
        node.thickness = 1;
        return 1;
      }

      let totalThickness = 0;
      for (const child of node.children) {
        totalThickness += calculateNodeThickness(child);
      }

      node.thickness = Math.max(1, totalThickness * 0.7);
      return node.thickness;
    };

    if (this.nodes.length > 0) {
      calculateNodeThickness(this.nodes[0]);
    }
  }

  getAttractors(): Attractor[] {
    return this.attractors;
  }
}

export const GrowthTree = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [treeGrown, setTreeGrown] = useState(false);
  const [organicTree, setOrganicTree] = useState<OrganicTree | null>(null);
  const [treeNodes, setTreeNodes] = useState<Node[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true });

  // Generate organic tree when in view
  useEffect(() => {
    if (inView && !organicTree) {
      console.log('Generating organic tree...');
      const tree = new OrganicTree(0, 100); // Center, adjusted position
      const nodes = tree.grow();
      console.log('Generated nodes:', nodes.length);
      setOrganicTree(tree);
      setTreeNodes(nodes);
      
      const timer = setTimeout(() => {
        console.log('Setting tree grown to true');
        setTreeGrown(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView, organicTree]);

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* Japanese-inspired subtle background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          🌸
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 text-5xl"
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          🍃
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Section Header with Japanese aesthetic */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-0.5 bg-nature-accent opacity-50"></div>
            <motion.span 
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              🌳
            </motion.span>
            <div className="w-16 h-0.5 bg-nature-accent opacity-50"></div>
          </div>
          
          <h2 className="heading-section text-nature-primary font-japanese mb-6">
            Tree of Achievements
          </h2>
          <p className="body-text text-nature-secondary max-w-3xl mx-auto mb-4">
            Watch our students flourish and bloom with every achievement. Each success grows our school's tree of excellence, 
            creating a forest of knowledge that inspires generations.
          </p>
          <p className="caption-text text-nature-accent font-traditional italic">
            "A tree that reaches for the sky first must have deep roots" - Japanese Proverb
          </p>
        </motion.div>

        {/* Organic Tree with Space Colonization Algorithm */}
        <div className="relative flex justify-center items-end h-[600px] mb-16 px-8">
          {/* Ground/Grass */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-200/30 via-green-100/20 to-transparent rounded-full"></div>
          
          {/* SVG Tree Container */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={treeGrown ? { opacity: 1 } : {}}
            transition={{ duration: 2 }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="-300 -100 600 500"
              className="overflow-visible"
            >
              {/* SVG Gradients for realistic wood texture */}
              <defs>
                <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3C2415" />
                  <stop offset="30%" stopColor="#5D4037" />
                  <stop offset="70%" stopColor="#8D6E63" />
                  <stop offset="100%" stopColor="#A1887F" />
                </linearGradient>
                <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B4513" />
                  <stop offset="50%" stopColor="#A0522D" />
                  <stop offset="100%" stopColor="#CD853F" />
                </linearGradient>
                <radialGradient id="leafGradient" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
                </radialGradient>
              </defs>

              {/* Root System */}
              <motion.g
                initial={{ opacity: 0, pathLength: 0 }}
                animate={treeGrown ? { opacity: 0.6, pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <path
                  d="M -8 200 Q -60 220 -100 210 M 8 200 Q 60 220 100 210 M -15 205 Q -40 225 -70 220 M 15 205 Q 40 225 70 220"
                  stroke="#654321"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.g>

              {/* Main Trunk */}
              <motion.rect
                x={-8}
                y={120}
                width={16}
                height={80}
                fill="url(#trunkGradient)"
                rx={8}
                initial={{ height: 0 }}
                animate={treeGrown ? { height: 80 } : {}}
                transition={{ duration: 2.5, delay: 1 }}
              />

              {/* Bark texture lines */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={treeGrown ? { opacity: 0.6 } : {}}
                transition={{ duration: 1, delay: 2 }}
              >
                <line x1={-5} y1={130} x2={-5} y2={190} stroke="#654321" strokeWidth={0.5} />
                <line x1={0} y1={125} x2={0} y2={195} stroke="#654321" strokeWidth={0.3} />
                <line x1={5} y1={135} x2={5} y2={185} stroke="#654321" strokeWidth={0.5} />
              </motion.g>

              {/* Realistic Curved Branches - Fallback if space colonization fails */}
              {treeNodes.length > 0 ? (
                treeNodes.map((node, index) => {
                  if (!node.parent) return null; // Skip root node
                  
                  return (
                    <motion.g key={index}>
                      {/* Curved branch line */}
                      <motion.path
                        d={`M ${node.parent.x} ${node.parent.y} Q ${(node.parent.x + node.x) / 2} ${(node.parent.y + node.y) / 2 - 10} ${node.x} ${node.y}`}
                        stroke="url(#branchGradient)"
                        strokeWidth={Math.max(0.5, node.thickness)}
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={treeGrown ? { pathLength: 1, opacity: 0.8 } : {}}
                        transition={{ 
                          duration: 0.8, 
                          delay: 2.5 + (index * 0.05),
                          ease: "easeOut"
                        }}
                      />
                    </motion.g>
                  );
                })
              ) : (
                // Fallback: Simple realistic curved branches
                <>
                  {/* Primary left branch */}
                  <motion.path
                    d="M 0 120 Q -40 100 -80 80"
                    stroke="url(#branchGradient)"
                    strokeWidth={4}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={treeGrown ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 1, delay: 2.5 }}
                  />
                  
                  {/* Primary right branch */}
                  <motion.path
                    d="M 0 120 Q 40 100 80 80"
                    stroke="url(#branchGradient)"
                    strokeWidth={4}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={treeGrown ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 1, delay: 2.7 }}
                  />

                  {/* Secondary left branches */}
                  <motion.path
                    d="M -60 90 Q -80 70 -100 50"
                    stroke="url(#branchGradient)"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={treeGrown ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 0.8, delay: 3 }}
                  />

                  <motion.path
                    d="M -70 85 Q -90 65 -110 45"
                    stroke="url(#branchGradient)"
                    strokeWidth={1.5}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={treeGrown ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 0.8, delay: 3.2 }}
                  />

                  {/* Secondary right branches */}
                  <motion.path
                    d="M 60 90 Q 80 70 100 50"
                    stroke="url(#branchGradient)"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={treeGrown ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 0.8, delay: 3.4 }}
                  />

                  <motion.path
                    d="M 70 85 Q 90 65 110 45"
                    stroke="url(#branchGradient)"
                    strokeWidth={1.5}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={treeGrown ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 0.8, delay: 3.6 }}
                  />

                  {/* Upper branches */}
                  <motion.path
                    d="M 0 120 Q -20 90 -40 60"
                    stroke="url(#branchGradient)"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={treeGrown ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 0.8, delay: 3.8 }}
                  />

                  <motion.path
                    d="M 0 120 Q 20 90 40 60"
                    stroke="url(#branchGradient)"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={treeGrown ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 0.8, delay: 4 }}
                  />
                </>
              )}

              {/* Achievement Leaves at branch endpoints */}
              {achievements.map((achievement, index) => {
                // Fixed positions for fallback or use space colonization if available
                const fallbackPositions = [
                  { x: -100, y: 50 },  // Upper left
                  { x: 100, y: 50 },   // Upper right
                  { x: -110, y: 45 },  // Left branch end
                  { x: 110, y: 45 },   // Right branch end
                  { x: -40, y: 60 },   // Upper left branch
                  { x: 40, y: 60 }     // Upper right branch
                ];

                const position = organicTree && organicTree.getAttractors()[index] 
                  ? organicTree.getAttractors()[index]
                  : fallbackPositions[index] || { x: 0, y: 50 };

                return (
                  <motion.g
                    key={achievement.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedAchievement(achievement)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={treeGrown ? { scale: 1, opacity: 1 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 4 + index * 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {/* Realistic leaf shape */}
                    <path
                      d={`M ${position.x} ${position.y - 20} Q ${position.x - 12} ${position.y - 15} ${position.x - 15} ${position.y} Q ${position.x - 10} ${position.y + 8} ${position.x} ${position.y + 12} Q ${position.x + 10} ${position.y + 8} ${position.x + 15} ${position.y} Q ${position.x + 12} ${position.y - 15} ${position.x} ${position.y - 20} Z`}
                      fill={categoryColors[achievement.category]}
                      stroke="#228B22"
                      strokeWidth={1}
                      opacity={0.9}
                    />
                    
                    {/* Leaf gradient overlay */}
                    <path
                      d={`M ${position.x} ${position.y - 20} Q ${position.x - 12} ${position.y - 15} ${position.x - 15} ${position.y} Q ${position.x - 10} ${position.y + 8} ${position.x} ${position.y + 12} Q ${position.x + 10} ${position.y + 8} ${position.x + 15} ${position.y} Q ${position.x + 12} ${position.y - 15} ${position.x} ${position.y - 20} Z`}
                      fill="url(#leafGradient)"
                    />

                    {/* Central vein */}
                    <line
                      x1={position.x}
                      y1={position.y - 15}
                      x2={position.x}
                      y2={position.y + 8}
                      stroke="#228B22"
                      strokeWidth={1}
                      opacity={0.6}
                    />

                    {/* Side veins */}
                    <path
                      d={`M ${position.x} ${position.y - 8} Q ${position.x - 6} ${position.y - 3} ${position.x - 10} ${position.y + 2} M ${position.x} ${position.y - 3} Q ${position.x + 6} ${position.y + 2} ${position.x + 10} ${position.y + 7}`}
                      stroke="#228B22"
                      strokeWidth={0.5}
                      fill="none"
                      opacity={0.4}
                    />

                    {/* Achievement icon */}
                    <text
                      x={position.x}
                      y={position.y + 2}
                      textAnchor="middle"
                      className="text-sm select-none"
                      fill="white"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                    >
                      {achievement.icon}
                    </text>

                    {/* Hover Tooltip */}
                    <g className="opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <rect
                        x={position.x + 20}
                        y={position.y - 25}
                        width={160}
                        height={50}
                        fill="white"
                        stroke="#9CAF88"
                        strokeWidth={1}
                        rx={6}
                        className="drop-shadow-lg"
                      />
                      <text x={position.x + 25} y={position.y - 10} className="text-xs font-bold fill-nature-primary">
                        {achievement.title}
                      </text>
                      <text x={position.x + 25} y={position.y + 2} className="text-xs fill-nature-secondary">
                        {achievement.description.slice(0, 30)}...
                      </text>
                      <text x={position.x + 25} y={position.y + 14} className="text-xs fill-nature-accent">
                        {achievement.students.join(', ').slice(0, 25)}...
                      </text>
                    </g>

                    {/* Gentle glow animation */}
                    <circle
                      cx={position.x}
                      cy={position.y}
                      r={20}
                      fill={categoryColors[achievement.category]}
                      opacity={0.2}
                      className="animate-pulse"
                    />
                  </motion.g>
                );
              })}

              {/* Organic Canopy */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={treeGrown ? { scale: 1, opacity: 0.3 } : {}}
                transition={{ duration: 2, delay: 5 }}
              >
                {/* Multiple organic canopy clusters */}
                <ellipse cx={-80} cy={40} rx={60} ry={30} fill="#4CAF50" opacity={0.4} transform="rotate(-15)" />
                <ellipse cx={80} cy={30} rx={55} ry={35} fill="#66BB6A" opacity={0.4} transform="rotate(12)" />
                <ellipse cx={-20} cy={20} rx={70} ry={25} fill="#81C784" opacity={0.3} transform="rotate(-8)" />
                <ellipse cx={30} cy={15} rx={50} ry={40} fill="#A5D6A7" opacity={0.3} transform="rotate(18)" />
                
                {/* Cherry blossom accents */}
                <circle cx={-40} cy={35} r={15} fill="#F8BBD9" opacity={0.2} />
                <circle cx={60} cy={25} r={12} fill="#F8BBD9" opacity={0.25} />
                <circle cx={10} cy={30} r={10} fill="#F8BBD9" opacity={0.15} />
              </motion.g>
            </svg>
          </motion.div>
        </div>

        {/* Achievement Categories Legend */}
        <motion.div
          className="flex justify-center flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 4 }}
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm font-medium text-nature-primary capitalize">
                {category}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 5 }}
        >
          <div className="max-w-3xl mx-auto">
            <p className="body-text text-nature-secondary mb-6">
              Every student has the potential to add their own leaf to our tree of success. 
              Join us in cultivating excellence, nurturing growth, and celebrating achievements that last a lifetime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="btn-nature px-8 py-3 font-medium flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🌱</span>
                <span>Join Our Growing Community</span>
              </motion.button>
              
              <motion.button
                className="btn-ghost px-8 py-3 font-medium flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📊</span>
                <span>View All Achievements</span>
              </motion.button>
            </div>
            
            <p className="caption-text text-nature-accent mt-6 font-traditional italic">
              "The best time to plant a tree was 20 years ago. The second best time is now." - Chinese Proverb
            </p>
          </div>
        </motion.div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedAchievement(null)}
        >
          <motion.div
            className="bg-nature-card rounded-2xl p-8 max-w-md w-full shadow-2xl border border-nature-accent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                style={{ backgroundColor: categoryColors[selectedAchievement.category] }}
              >
                <span className="text-4xl">{selectedAchievement.icon}</span>
              </div>
              <h3 className="heading-card text-nature-primary mb-2">
                {selectedAchievement.title}
              </h3>
              <p className="caption-text text-nature-accent capitalize">
                {selectedAchievement.category} • {selectedAchievement.date}
              </p>
            </div>

            <div className="space-y-4">
              <p className="body-text text-nature-secondary">
                {selectedAchievement.description}
              </p>
              
              <div>
                <h4 className="font-medium text-nature-primary mb-2">Achieved by:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAchievement.students.map((student, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-nature-secondary rounded-full text-sm text-nature-primary"
                    >
                      {student}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="w-full mt-6 btn-nature py-2"
              onClick={() => setSelectedAchievement(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};