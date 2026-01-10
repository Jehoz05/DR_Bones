export interface FractureType {
  id: string;
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatment: string;
  recoveryTime: string;
  complications: string[];
}

export const fractureTypes: FractureType[] = [
  {
    id: "clavicle",
    name: "Clavicle Fracture",
    category: "Upper Body",
    description:
      "A clavicle fracture (broken collarbone) is a common injury that happens when the bone between your shoulder blade and breastbone breaks.",
    symptoms: [
      "Bone pain in shoulder or neck area",
      "Difficulty moving shoulder",
      "Bruising along clavicle",
      "Visible misalignment",
      "Skin tenting",
      "Swelling",
    ],
    causes: [
      "Falls on shoulder or outstretched arm",
      "Sports collisions",
      "Car accidents",
      "Birth trauma",
    ],
    treatment:
      "Most heal with conservative treatment including immobilization with sling, pain relief, and physical therapy. Surgery may be needed if pieces move out of place.",
    recoveryTime:
      "8-12 weeks for adults, 6-8 weeks for adolescents, 3-6 weeks for children",
    complications: [
      "Persistent bone pain",
      "Bone deformity",
      "Calluses",
      "Frozen shoulder",
      "Joint pain",
    ],
  },
  {
    id: "shoulder",
    name: "Shoulder Fracture",
    category: "Upper Body",
    description:
      "Fractures involving the shoulder joint, including the proximal humerus, scapula, or glenoid.",
    symptoms: [
      "Severe shoulder pain",
      "Limited range of motion",
      "Swelling",
      "Bruising",
    ],
    causes: ["Falls", "Sports injuries", "Motor vehicle accidents"],
    treatment:
      "Treatment varies from conservative management to surgical repair depending on fracture type and displacement.",
    recoveryTime: "6-12 weeks depending on severity",
    complications: ["Stiffness", "Nerve damage", "Arthritis"],
  },
  {
    id: "humerus",
    name: "Humerus Fracture",
    category: "Upper Body",
    description:
      "Fracture of the upper arm bone, which can occur at the proximal end (near shoulder) or distal end (near elbow).",
    symptoms: ["Arm pain", "Swelling", "Inability to move arm", "Deformity"],
    causes: ["Falls", "Direct trauma", "Osteoporosis-related fractures"],
    treatment:
      "May require surgical fixation with plates, screws, or rods depending on location and severity.",
    recoveryTime: "8-16 weeks",
    complications: ["Nerve injury", "Nonunion", "Infection"],
  },
  {
    id: "elbow",
    name: "Elbow Fracture",
    category: "Upper Body",
    description:
      "Fractures involving the elbow joint, including olecranon, radial head, or distal humerus fractures.",
    symptoms: [
      "Elbow pain",
      "Swelling",
      "Limited movement",
      "Numbness in fingers",
    ],
    causes: [
      "Falls on outstretched hand",
      "Direct blow to elbow",
      "Sports injuries",
    ],
    treatment:
      "Often requires surgical repair to restore joint function and alignment.",
    recoveryTime: "6-12 weeks with extensive rehabilitation",
    complications: ["Stiffness", "Arthritis", "Nerve damage"],
  },
  {
    id: "rib",
    name: "Rib Fracture",
    category: "Upper Body",
    description:
      "Break in one or more ribs, commonly caused by blunt chest trauma.",
    symptoms: [
      "Chest pain",
      "Pain when breathing",
      "Tenderness",
      "Shortness of breath",
    ],
    causes: [
      "Motor vehicle accidents",
      "Falls",
      "Sports injuries",
      "Direct blows",
    ],
    treatment:
      "Usually conservative with pain management and breathing exercises. Surgery for severe cases.",
    recoveryTime: "6-8 weeks",
    complications: ["Pneumonia", "Punctured lung", "Chronic pain"],
  },
  {
    id: "compression",
    name: "Compression Fracture",
    category: "Spine",
    description:
      "Vertebral compression fracture where the vertebra collapses due to pressure.",
    symptoms: [
      "Back pain",
      "Loss of height",
      "Kyphosis (hunched posture)",
      "Limited mobility",
    ],
    causes: ["Osteoporosis", "Trauma", "Tumors", "Infection"],
    treatment:
      "Conservative treatment, vertebroplasty, or kyphoplasty depending on severity.",
    recoveryTime: "8-12 weeks",
    complications: [
      "Chronic pain",
      "Spinal deformity",
      "Neurological symptoms",
    ],
  },
  {
    id: "facial",
    name: "Facial Fracture",
    category: "Head/Face",
    description:
      "Fractures involving facial bones including nose, cheek, jaw, or orbital bones.",
    symptoms: [
      "Facial pain",
      "Swelling",
      "Bruising",
      "Vision problems",
      "Difficulty chewing",
    ],
    causes: ["Motor vehicle accidents", "Sports injuries", "Falls", "Assault"],
    treatment:
      "May require surgical repair for functional and cosmetic restoration.",
    recoveryTime: "4-8 weeks depending on location",
    complications: ["Nerve damage", "Scarring", "Functional impairment"],
  },
];

export interface DetectionResult {
  fractureType: string | null;
  confidence: number;
  aiRecommendation: string;
  isNormal: boolean;
  isSuspect: boolean;
}

export const detectFracture = (imageName: string): DetectionResult => {
  const lowerImageName = imageName.toLowerCase();

  // Check for normal/healthy indicators
  const normalKeywords = ["normal", "healthy", "clear", "good", "fine", "ok"];
  const isNormal = normalKeywords.some((keyword) =>
    lowerImageName.includes(keyword)
  );

  if (isNormal) {
    return {
      fractureType: null,
      confidence: 100,
      aiRecommendation:
        "The X-ray appears normal with no signs of fracture. The bone structure shows healthy density and alignment. Continue regular check-ups and maintain bone health through proper nutrition and exercise.",
      isNormal: true,
      isSuspect: false,
    };
  }

  // Check for suspect indicators
  const suspectKeywords = [
    "suspect",
    "unclear",
    "possible",
    "maybe",
    "questionable",
    "blurry",
  ];
  const isSuspect = suspectKeywords.some((keyword) =>
    lowerImageName.includes(keyword)
  );

  if (isSuspect) {
    return {
      fractureType: null,
      confidence: Math.floor(Math.random() * 31) + 10, // 10-40%
      aiRecommendation:
        "The image quality or findings are inconclusive. Further imaging or clinical evaluation is recommended. Please consult with a radiologist or orthopedic specialist for a definitive diagnosis.",
      isNormal: false,
      isSuspect: true,
    };
  }

  // Check for specific fracture types
  for (const fracture of fractureTypes) {
    const fractureKeywords = [
      fracture.id,
      fracture.name.toLowerCase(),
      ...fracture.name.toLowerCase().split(" "),
    ];

    const hasFractureKeyword = fractureKeywords.some((keyword) =>
      lowerImageName.includes(
        keyword.replace(" fracture", "").replace(" fractures", "")
      )
    );

    if (hasFractureKeyword) {
      const confidence = Math.floor(Math.random() * 39) + 60; // 60-98%

      return {
        fractureType: fracture.id,
        confidence,
        aiRecommendation: `${fracture.name} detected. ${
          fracture.description
        } Immediate medical attention is recommended. Treatment typically involves ${fracture.treatment.toLowerCase()}. Expected recovery time: ${
          fracture.recoveryTime
        }.`,
        isNormal: false,
        isSuspect: false,
      };
    }
  }

  // Default case - treat as suspect if no clear indicators
  return {
    fractureType: null,
    confidence: Math.floor(Math.random() * 31) + 10, // 10-40%
    aiRecommendation:
      "Unable to determine fracture type from image name. Please ensure the image is clear and properly labeled. Consider retaking the X-ray or consulting with a medical professional for proper diagnosis.",
    isNormal: false,
    isSuspect: true,
  };
};

export const getFractureInfo = (fractureId: string): FractureType | null => {
  return fractureTypes.find((fracture) => fracture.id === fractureId) || null;
};
