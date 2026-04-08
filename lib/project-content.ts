export const components = [
  {
    title: "1. Disorder and Diagnosis",
    description:
      "Define the disorder clearly and explain how psychologists diagnose it using DSM-5 style criteria and symptom patterns.",
    prompt:
      "What signs/symptoms must be present, and how do clinicians decide the symptoms are severe enough to qualify for diagnosis?",
  },
  {
    title: "2. Biopsychosocial Causes",
    description:
      "Explain biological, psychological, and environmental contributors. Focus on how multiple factors interact.",
    prompt:
      "Which factors are most supported by research for your disorder, and how do they increase risk?",
  },
  {
    title: "3. Treatment and How It Works",
    description:
      "Describe therapy and medication options in plain language. Explain mechanisms, not just names of treatments.",
    prompt:
      "How does each treatment reduce symptoms or improve functioning over time?",
  },
  {
    title: "4. Day-in-the-Life Impact",
    description:
      "Show what daily functioning might look like for someone with the disorder in a realistic and respectful way.",
    prompt:
      "How might school, work, relationships, sleep, focus, or routines be affected without using stereotypes?",
  },
  {
    title: "5. Family and Caregiver Experience",
    description:
      "Explain emotional, social, and practical caregiving challenges family members may face.",
    prompt:
      "What support strategies help families cope while still respecting the person's autonomy and dignity?",
  },
];

export const categories = [
  {
    name: "Anxiety Disorders",
    items: [
      "Generalized Anxiety Disorder",
      "Panic Disorder",
      "Specific Phobia",
      "Social Anxiety Disorder",
      "Agoraphobia",
    ],
  },
  {
    name: "Obsessive-Compulsive and Related Disorders",
    items: ["Obsessive-Compulsive Disorder (OCD)"],
  },
  {
    name: "Trauma and Stressor-Related Disorders",
    items: ["Post-Traumatic Stress Disorder (PTSD)"],
  },
  {
    name: "Depressive Disorders",
    items: [
      "Major Depressive Disorder",
      "Persistent Depressive Disorder (Dysthymia)",
    ],
  },
  {
    name: "Bipolar Disorders",
    items: ["Bipolar Disorder"],
  },
  {
    name: "Schizophrenia Spectrum Disorders",
    items: ["Schizophrenia"],
  },
  {
    name: "Dissociative Disorders",
    items: ["Dissociative Identity Disorder (DID)"],
  },
  {
    name: "Eating Disorders",
    items: ["Anorexia Nervosa", "Bulimia Nervosa", "Binge-Eating Disorder"],
  },
  {
    name: "Personality Disorders",
    items: [
      "Antisocial Personality Disorder",
      "Borderline Personality Disorder",
      "Narcissistic Personality Disorder",
    ],
  },
];

export const creativeOptions = [
  {
    title: "Visual Art Representation",
    details:
      "Create an original drawing, painting, or symbolic visual that communicates lived experience accurately.",
    focus:
      "Explain how your imagery connects to real symptoms, causes, and treatment concepts.",
  },
  {
    title: "Podcast or Interview Segment",
    details:
      "Produce a 3-5 minute audio piece with a host segment, expert perspective, or myth-vs-fact breakdown.",
    focus:
      "Show clear links to your research and correct common misunderstandings.",
  },
  {
    title: "Public Awareness Campaign",
    details:
      "Build a campaign using a poster, infographic, mock social posts, or PSA script.",
    focus:
      "Target misconceptions and educate the public in respectful, stigma-reducing language.",
  },
  {
    title: "Board Game or Interactive Activity",
    details:
      "Design gameplay that models symptoms, challenges, and coping/treatment paths.",
    focus:
      "Connect mechanics to psychology concepts so the activity teaches, not just entertains.",
  },
];

export const partOneRubric = [
  {
    criterion: "Explanation of Disorder & Symptoms",
    excellent:
      "Clear, accurate DSM-5 based explanation with correct psychology terminology.",
    proficient: "Explains disorder and symptoms with minor clarity or detail gaps.",
    developing: "Unclear, incomplete, or inaccurate explanation.",
    points: "/10",
  },
  {
    criterion: "Causes / Biopsychosocial Factors",
    excellent:
      "Thorough explanation of biological, psychological, and/or environmental factors.",
    proficient:
      "Adequate explanation, but depth or research connection is limited.",
    developing: "Causes are unclear, incomplete, or inaccurate.",
    points: "/10",
  },
  {
    criterion: "Treatment Explanation",
    excellent:
      "Clearly explains therapy/medication and how treatment manages symptoms.",
    proficient: "Treatment explained with limited depth.",
    developing: "Treatments listed with little or no explanation.",
    points: "/10",
  },
  {
    criterion: "Impact on Daily Life & Families",
    excellent:
      "Insightful and realistic explanation of daily functioning and family impact.",
    proficient: "Adequate but somewhat general discussion.",
    developing: "Limited, unrealistic, or overly generalized impact description.",
    points: "/10",
  },
  {
    criterion: "Research Quality & Writing",
    excellent:
      "3-4 credible sources, APA citations, original writing, organized and clear.",
    proficient:
      "Minor citation errors, limited sources, or uneven source reliability.",
    developing: "Missing citations, weak sources, or copied information.",
    points: "/10",
  },
];

export const partTwoRubric = [
  {
    criterion: "Psychological Accuracy",
    excellent: "Creative piece is accurate and demonstrates strong understanding.",
    proficient: "Mostly accurate with minor misunderstandings.",
    developing: "Several inaccuracies or weak connection to research.",
    points: "/15",
  },
  {
    criterion: "Creativity & Effort",
    excellent: "Highly original, thoughtful, and clearly effortful work.",
    proficient: "Shows effort, but creativity or depth is limited.",
    developing: "Minimal effort or originality.",
    points: "/10",
  },
  {
    criterion: "Connection to Psychological Concepts",
    excellent:
      "Group clearly explains links between creative choices and psychology concepts.",
    proficient: "Some connections, but explanation is limited.",
    developing: "Connections are weak or unclear.",
    points: "/10",
  },
  {
    criterion: "Presentation & Teaching the Class",
    excellent:
      "Clear, confident, organized presentation without reading directly.",
    proficient: "Understandable presentation with some note reliance.",
    developing: "Unclear, disorganized, or mostly read aloud.",
    points: "/10",
  },
  {
    criterion: "Professionalism & Respect for Mental Health",
    excellent: "Respectful portrayal that avoids stereotypes or exaggeration.",
    proficient: "Mostly respectful with minor issues.",
    developing: "Trivializes or misrepresents mental illness.",
    points: "/5",
  },
];

export const sources = [
  { name: "National Institutes of Health (NIH)", url: "https://www.nih.gov/" },
  {
    name: "National Alliance on Mental Illness (NAMI)",
    url: "https://www.nami.org/Home",
  },
  {
    name: "American Psychiatric Association",
    url: "https://www.psychiatry.org/",
  },
  { name: "American Psychological Association", url: "https://www.apa.org/" },
  { name: "Mayo Clinic", url: "https://www.mayoclinic.org/" },
  {
    name: "Cleveland Clinic Psychiatry & Psychology",
    url: "https://my.clevelandclinic.org/departments/neurological/depts/psychiatry-psychology",
  },
];
