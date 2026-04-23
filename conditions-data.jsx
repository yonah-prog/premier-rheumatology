// Conditions data — central CMS source of truth. Add a condition here, it appears
// on the hub automatically. Articles render from the `body` field or fall back to stub.

const CATEGORIES = [
  { id: 'inflammatory-autoimmune-arthritis', label: 'Inflammatory & Autoimmune Arthritis', short: 'Inflammatory Arthritis', tone: 'purple' },
  { id: 'systemic-autoimmune',               label: 'Systemic Autoimmune & Connective Tissue Diseases', short: 'Systemic Autoimmune', tone: 'warm' },
  { id: 'bone-metabolic',                    label: 'Bone & Metabolic Disorders', short: 'Bone & Metabolic', tone: 'cool' },
  { id: 'crystal-inflammatory',              label: 'Crystal & Inflammatory Conditions', short: 'Crystal Conditions', tone: 'warm' },
  { id: 'degenerative-mechanical',           label: 'Degenerative & Mechanical Joint Conditions', short: 'Degenerative Joint', tone: 'mint' },
  { id: 'immune-mediated',                   label: 'Inflammatory & Immune-Mediated Conditions', short: 'Immune-Mediated', tone: 'purple' },
  { id: 'soft-tissue-pain',                  label: 'Soft Tissue & Pain Syndromes', short: 'Soft Tissue & Pain', tone: 'mint' },
  { id: 'spine-axial',                       label: 'Spine & Axial Disorders', short: 'Spine & Axial', tone: 'cool' },
  { id: 'sports-overuse',                    label: 'Sports & Overuse Injuries', short: 'Sports & Overuse', tone: 'warm' },
  { id: 'general-rheumatologic',             label: 'General Rheumatologic Concerns', short: 'General Concerns', tone: 'cool' },
];

// 44 conditions — stub schema. Full articles override with body, faqs, etc.
const CONDITIONS = [
  // Inflammatory & Autoimmune Arthritis
  { slug: 'rheumatoid-arthritis', title: 'Rheumatoid Arthritis', category: 'inflammatory-autoimmune-arthritis', excerpt: 'A chronic autoimmune condition causing joint inflammation, stiffness, and long-term joint damage without treatment.', readTime: 8, featured: true, keywords: ['RA','autoimmune','joint pain','morning stiffness'],
    keyFacts: [
      { label: 'What it is', value: 'A chronic autoimmune disease in which the immune system attacks the lining of the joints (synovium).' },
      { label: 'Who it affects', value: 'Approximately 1% of adults in the U.S., with women affected 2–3 times more often than men. Most commonly diagnosed between ages 30–60.' },
      { label: 'Hallmark symptoms', value: 'Symmetric joint pain and swelling, prolonged morning stiffness (often >1 hour), fatigue, and low-grade fever.' },
      { label: 'When to see a rheumatologist', value: 'Persistent joint pain or swelling lasting more than six weeks, especially in the hands, wrists, or feet.' },
    ],
    body: [
      { h2: 'What is rheumatoid arthritis?', p: [
        "Rheumatoid arthritis (RA) is a chronic autoimmune disease in which the body's immune system mistakenly attacks the synovium — the thin tissue lining the joints. This leads to inflammation, pain, swelling, and, over time, damage to cartilage and bone. Unlike osteoarthritis, which results from mechanical wear, RA is driven by immune system activity and can affect multiple joints at once, often symmetrically.",
        "RA is a systemic condition, meaning it can affect more than just the joints. Inflammation may also involve the skin, eyes, lungs, heart, and blood vessels. Early diagnosis and treatment are critical to preventing joint damage and long-term disability.",
      ]},
      { h2: 'Common symptoms', p: [
        'RA symptoms often develop gradually over weeks or months. Patients frequently describe:',
      ], list: [
        'Joint pain, swelling, and tenderness — most often in the hands, wrists, and feet.',
        'Morning stiffness lasting more than 30–60 minutes.',
        'Symmetric joint involvement (both sides of the body affected similarly).',
        'Fatigue, low-grade fevers, or loss of appetite.',
        'Rheumatoid nodules — firm lumps under the skin near affected joints.',
      ]},
      { h2: 'How we diagnose RA', p: [
        "Diagnosis combines clinical evaluation with laboratory testing and imaging. At Premier Rheumatology, an initial RA workup typically includes a detailed history, physical examination of the joints, blood tests (including rheumatoid factor, anti-CCP antibodies, and inflammatory markers like CRP and ESR), and imaging such as X-ray or ultrasound to assess joint involvement.",
        "No single test confirms RA. Diagnosis is based on the overall pattern of symptoms, exam findings, and test results — which is why evaluation by a rheumatologist is essential.",
      ]},
      { h2: 'Treatment approach', p: [
        "Modern RA treatment focuses on early, aggressive control of inflammation to prevent joint damage — often described as a treat-to-target approach. Options include:",
      ], list: [
        'Disease-modifying antirheumatic drugs (DMARDs), such as methotrexate, as first-line therapy.',
        'Biologic medications (e.g., TNF inhibitors, IL-6 inhibitors) for patients needing more targeted therapy.',
        'Targeted synthetic DMARDs (JAK inhibitors) as oral alternatives.',
        'On-site infusion therapy at both our Boca Raton and Queens offices.',
        'Physical therapy, lifestyle adjustments, and symptom management.',
      ]},
      { h2: 'Living with RA', p: [
        'With today\'s treatments, many people with RA can achieve low disease activity or remission. Regular follow-up is essential — both to monitor disease activity and to adjust treatment when needed. Our rheumatologists partner with patients over the long term, making thoughtful adjustments based on how you\'re responding.',
      ]},
    ],
    faqs: [
      { q: 'Is rheumatoid arthritis curable?', a: 'There is currently no cure for RA, but modern treatments can often achieve remission or very low disease activity, allowing patients to live full, active lives. Early diagnosis and consistent treatment are key.' },
      { q: 'How is RA different from osteoarthritis?', a: 'RA is an autoimmune disease driven by inflammation, typically causing symmetric joint involvement, prolonged morning stiffness, and systemic symptoms. Osteoarthritis is caused by gradual cartilage wear, usually affects joints asymmetrically, and stiffness is typically brief.' },
      { q: 'Do I need to take medication for the rest of my life?', a: 'Most patients with RA benefit from ongoing medication to control inflammation and prevent joint damage. Some patients in sustained remission may be able to reduce doses — always under rheumatologist supervision.' },
      { q: 'Can diet or lifestyle changes help?', a: 'While diet and exercise cannot replace medical treatment, they play a meaningful supporting role. Anti-inflammatory eating patterns, regular low-impact exercise, and smoking cessation all support better outcomes.' },
    ],
  },
  { slug: 'psoriatic-arthritis', title: 'Psoriatic Arthritis', category: 'inflammatory-autoimmune-arthritis', excerpt: 'Inflammatory arthritis associated with psoriasis, affecting joints, skin, and sometimes the spine.', readTime: 6, featured: true, keywords: ['psoriasis','PsA'] },
  { slug: 'juvenile-idiopathic-arthritis', title: 'Juvenile Idiopathic Arthritis', category: 'inflammatory-autoimmune-arthritis', excerpt: 'Autoimmune arthritis beginning in childhood, with several subtypes and long-term care needs.', readTime: 5, keywords: ['JIA','pediatric'] },
  { slug: 'reactive-arthritis', title: 'Reactive Arthritis', category: 'inflammatory-autoimmune-arthritis', excerpt: 'Joint inflammation triggered by infection elsewhere in the body, often self-limiting but sometimes persistent.', readTime: 4, keywords: ['Reiter','post-infectious'] },

  // Systemic Autoimmune & Connective Tissue
  { slug: 'lupus', title: 'Systemic Lupus Erythematosus (Lupus)', category: 'systemic-autoimmune', excerpt: 'A complex autoimmune disease that can affect skin, joints, kidneys, blood, and other organ systems.', readTime: 9, featured: true, keywords: ['SLE','lupus','autoimmune'],
    keyFacts: [
      { label: 'What it is', value: 'A chronic autoimmune disease in which the immune system attacks healthy tissues across multiple organ systems.' },
      { label: 'Who it affects', value: 'About 90% of cases occur in women, typically diagnosed between ages 15–45. Lupus is more common and often more severe in women of African, Hispanic, and Asian descent.' },
      { label: 'Hallmark symptoms', value: 'Fatigue, joint pain, malar (butterfly) rash, photosensitivity, mouth sores, and symptoms affecting kidneys, blood, or nervous system.' },
      { label: 'When to see a rheumatologist', value: 'Persistent unexplained symptoms across multiple body systems, especially with a positive ANA blood test.' },
    ],
    body: [
      { h2: 'What is lupus?', p: [
        'Systemic lupus erythematosus (SLE), commonly called lupus, is a chronic autoimmune disease in which the immune system produces antibodies that attack the body\'s own tissues. Lupus can affect many organ systems — joints, skin, kidneys, blood cells, brain, heart, and lungs — and symptoms often come and go in flares.',
        'Because lupus presents differently in every patient, diagnosis and management require careful, ongoing evaluation by a rheumatologist experienced in complex autoimmune disease.',
      ]},
      { h2: 'Common symptoms', p: [
        'Lupus symptoms are highly variable. Frequently reported features include:',
      ], list: [
        'Profound fatigue, often the most disabling symptom.',
        'Joint pain and swelling, typically without the severe joint damage seen in RA.',
        'Butterfly-shaped (malar) rash across the cheeks and nose, and photosensitivity to sunlight.',
        'Mouth or nose sores.',
        'Raynaud\'s phenomenon — color changes in the fingers with cold or stress.',
        'Kidney involvement (lupus nephritis), blood abnormalities, or neurologic symptoms in more severe cases.',
      ]},
      { h2: 'How we diagnose lupus', p: [
        'There is no single test for lupus. Diagnosis combines clinical findings with laboratory testing (ANA, anti-dsDNA, anti-Smith antibodies, complement levels, complete blood count, kidney function) and sometimes biopsy when organ involvement is suspected. A positive ANA alone does not diagnose lupus — the full clinical picture matters.',
      ]},
      { h2: 'Treatment approach', p: [
        'Treatment is tailored to which organs are affected and how severely. Our approach typically includes:',
      ], list: [
        'Hydroxychloroquine for most patients — a foundational therapy that reduces flares and long-term complications.',
        'Corticosteroids to control active inflammation, used thoughtfully at the lowest effective dose.',
        'Immunosuppressive medications for moderate to severe disease or organ involvement.',
        'Newer targeted biologic therapies such as belimumab or anifrolumab for appropriate patients.',
        'Sun protection, cardiovascular risk management, and bone health monitoring.',
      ]},
      { h2: 'Long-term outlook', p: [
        'With modern treatment, most people with lupus can lead full lives. Ongoing rheumatology care is essential — both to manage flares and to monitor for long-term complications. We partner with patients and their other physicians to coordinate comprehensive, personalized care.',
      ]},
    ],
    faqs: [
      { q: 'Is lupus hereditary?', a: 'Lupus is not directly inherited, but genetic factors increase susceptibility. Family history of lupus or other autoimmune diseases raises risk, though most people with lupus have no affected relatives.' },
      { q: 'What is a lupus flare?', a: 'A flare is a period when lupus symptoms worsen — increased fatigue, joint pain, rash, fever, or new organ involvement. Flares can be triggered by sun exposure, infections, stress, or medication changes.' },
      { q: 'Can I get pregnant if I have lupus?', a: 'Many women with lupus have successful pregnancies, but pregnancy should be planned during a period of stable disease and managed closely with both rheumatology and obstetrics. Certain medications must be adjusted before conception.' },
      { q: 'What does a positive ANA mean?', a: 'A positive ANA (antinuclear antibody) is common in lupus but also occurs in healthy people and other conditions. It is a starting point, not a diagnosis — interpretation requires clinical context.' },
    ],
  },
  { slug: 'sjogrens-syndrome', title: "Sjögren's Syndrome", category: 'systemic-autoimmune', excerpt: 'An autoimmune condition causing dry eyes, dry mouth, and fatigue, often alongside other rheumatic diseases.', readTime: 5, featured: true, keywords: ['dry eyes','dry mouth'] },
  { slug: 'scleroderma', title: 'Scleroderma (Systemic Sclerosis)', category: 'systemic-autoimmune', excerpt: 'Autoimmune disease that hardens and tightens skin and connective tissues, sometimes affecting internal organs.', readTime: 6, keywords: ['systemic sclerosis'] },
  { slug: 'dermatomyositis', title: 'Dermatomyositis', category: 'systemic-autoimmune', excerpt: 'Inflammatory muscle disease with distinctive skin changes and progressive muscle weakness.', readTime: 5, keywords: ['myositis'] },
  { slug: 'polymyositis', title: 'Polymyositis', category: 'systemic-autoimmune', excerpt: 'Chronic inflammatory muscle disease causing bilateral, proximal muscle weakness.', readTime: 4, keywords: ['muscle weakness'] },
  { slug: 'mixed-connective-tissue-disease', title: 'Mixed Connective Tissue Disease', category: 'systemic-autoimmune', excerpt: 'An overlap condition with features of lupus, scleroderma, and polymyositis.', readTime: 5, keywords: ['MCTD','overlap'] },
  { slug: 'raynauds-phenomenon', title: "Raynaud's Phenomenon", category: 'systemic-autoimmune', excerpt: 'Episodes of reduced blood flow to fingers and toes triggered by cold or stress.', readTime: 4, keywords: ['cold fingers','vasospasm'] },

  // Bone & Metabolic
  { slug: 'osteoporosis', title: 'Osteoporosis', category: 'bone-metabolic', excerpt: 'A condition where bones become weak and prone to fracture, often without symptoms until a break occurs.', readTime: 7, featured: true, keywords: ['bone density','DEXA','fracture risk'] },
  { slug: 'osteopenia', title: 'Osteopenia', category: 'bone-metabolic', excerpt: 'Lower-than-normal bone density that may progress to osteoporosis without intervention.', readTime: 4, keywords: ['bone density'] },
  { slug: 'pagets-disease', title: "Paget's Disease of Bone", category: 'bone-metabolic', excerpt: 'A chronic disorder that disrupts normal bone remodeling, leading to enlarged or misshapen bones.', readTime: 4, keywords: ['bone remodeling'] },
  { slug: 'osteomalacia', title: 'Osteomalacia', category: 'bone-metabolic', excerpt: 'Softening of bones usually caused by vitamin D deficiency, leading to pain and muscle weakness.', readTime: 3, keywords: ['vitamin D'] },

  // Crystal & Inflammatory
  { slug: 'gout', title: 'Gout', category: 'crystal-inflammatory', excerpt: 'A painful inflammatory arthritis caused by uric acid crystal buildup in the joints, often starting in the big toe.', readTime: 7, featured: true, keywords: ['uric acid','flare','big toe'] },
  { slug: 'pseudogout', title: 'Pseudogout (CPPD)', category: 'crystal-inflammatory', excerpt: 'Joint inflammation from calcium pyrophosphate crystal deposits, often affecting knees and wrists.', readTime: 4, keywords: ['CPPD','calcium'] },
  { slug: 'calcium-apatite-deposition', title: 'Calcium Apatite Deposition Disease', category: 'crystal-inflammatory', excerpt: 'Crystal-induced inflammation affecting tendons and joints, most commonly in the shoulder.', readTime: 3, keywords: ['calcific tendonitis'] },

  // Degenerative & Mechanical Joint
  { slug: 'osteoarthritis', title: 'Osteoarthritis', category: 'degenerative-mechanical', excerpt: 'The most common form of arthritis, caused by gradual cartilage breakdown and affecting knees, hips, hands, and spine.', readTime: 7, featured: true, keywords: ['OA','wear and tear','cartilage'] },
  { slug: 'degenerative-disc-disease', title: 'Degenerative Disc Disease', category: 'degenerative-mechanical', excerpt: 'Age-related changes to spinal discs that can contribute to back or neck pain.', readTime: 4, keywords: ['disc','back pain'] },
  { slug: 'knee-osteoarthritis', title: 'Knee Osteoarthritis', category: 'degenerative-mechanical', excerpt: 'Cartilage wear in the knee joint leading to pain, stiffness, and reduced mobility.', readTime: 5, keywords: ['knee pain'] },
  { slug: 'hip-osteoarthritis', title: 'Hip Osteoarthritis', category: 'degenerative-mechanical', excerpt: 'Progressive cartilage loss in the hip joint causing groin pain and limited range of motion.', readTime: 4, keywords: ['hip pain'] },
  { slug: 'hand-osteoarthritis', title: 'Hand & Thumb Osteoarthritis', category: 'degenerative-mechanical', excerpt: 'Degenerative changes affecting finger joints and the base of the thumb.', readTime: 4, keywords: ['hand pain','CMC'] },

  // Immune-Mediated
  { slug: 'vasculitis', title: 'Vasculitis', category: 'immune-mediated', excerpt: 'A group of disorders involving inflammation of blood vessels, with varied presentations.', readTime: 6, keywords: ['blood vessel'] },
  { slug: 'giant-cell-arteritis', title: 'Giant Cell Arteritis', category: 'immune-mediated', excerpt: 'Vasculitis of large arteries, typically in adults over 50, which can threaten vision if untreated.', readTime: 4, keywords: ['temporal arteritis'] },
  { slug: 'polymyalgia-rheumatica', title: 'Polymyalgia Rheumatica', category: 'immune-mediated', excerpt: 'Inflammatory condition causing shoulder and hip girdle pain and stiffness in older adults.', readTime: 4, keywords: ['PMR'] },
  { slug: 'sarcoidosis', title: 'Sarcoidosis', category: 'immune-mediated', excerpt: 'A systemic inflammatory disease forming granulomas in multiple organ systems.', readTime: 5, keywords: ['granuloma'] },
  { slug: 'ibd-associated-arthritis', title: 'IBD-Associated Arthritis', category: 'immune-mediated', excerpt: 'Joint inflammation linked to inflammatory bowel disease (Crohn\'s or ulcerative colitis).', readTime: 4, keywords: ['Crohn\'s','colitis'] },

  // Soft Tissue & Pain
  { slug: 'fibromyalgia', title: 'Fibromyalgia', category: 'soft-tissue-pain', excerpt: 'A chronic condition characterized by widespread musculoskeletal pain, fatigue, and sleep disturbance.', readTime: 6, featured: true, keywords: ['widespread pain','chronic fatigue'] },
  { slug: 'myofascial-pain-syndrome', title: 'Myofascial Pain Syndrome', category: 'soft-tissue-pain', excerpt: 'Chronic pain disorder involving trigger points in muscle fascia.', readTime: 3, keywords: ['trigger points'] },
  { slug: 'chronic-fatigue-syndrome', title: 'Chronic Fatigue Syndrome', category: 'soft-tissue-pain', excerpt: 'Persistent, unexplained fatigue unimproved by rest, often overlapping with rheumatic conditions.', readTime: 4, keywords: ['ME/CFS'] },

  // Spine & Axial
  { slug: 'ankylosing-spondylitis', title: 'Ankylosing Spondylitis', category: 'spine-axial', excerpt: 'A chronic inflammatory arthritis that primarily affects the spine and sacroiliac joints.', readTime: 6, keywords: ['AS','axial SpA'] },
  { slug: 'axial-spondyloarthritis', title: 'Axial Spondyloarthritis', category: 'spine-axial', excerpt: 'Spectrum of inflammatory back conditions, including non-radiographic and ankylosing spondylitis.', readTime: 5, keywords: ['axSpA'] },
  { slug: 'sacroiliitis', title: 'Sacroiliitis', category: 'spine-axial', excerpt: 'Inflammation of the sacroiliac joints, often presenting as lower back or buttock pain.', readTime: 3, keywords: ['SI joint'] },
  { slug: 'spinal-stenosis', title: 'Spinal Stenosis', category: 'spine-axial', excerpt: 'Narrowing of the spinal canal that can cause nerve compression and leg pain.', readTime: 4, keywords: ['stenosis'] },

  // Sports & Overuse
  { slug: 'tendonitis', title: 'Tendonitis', category: 'sports-overuse', excerpt: 'Inflammation or irritation of a tendon, commonly affecting the shoulder, elbow, wrist, or knee.', readTime: 3, keywords: ['tendon','overuse'] },
  { slug: 'bursitis', title: 'Bursitis', category: 'sports-overuse', excerpt: 'Inflammation of the fluid-filled sacs (bursae) that cushion joints.', readTime: 3, keywords: ['bursa'] },
  { slug: 'rotator-cuff-injury', title: 'Rotator Cuff Injuries', category: 'sports-overuse', excerpt: 'Strain, tendinopathy, or tears of the shoulder rotator cuff tendons.', readTime: 4, keywords: ['shoulder','rotator cuff'] },
  { slug: 'tennis-elbow', title: 'Tennis & Golfer\'s Elbow', category: 'sports-overuse', excerpt: 'Overuse tendinopathy affecting the outer (lateral) or inner (medial) elbow.', readTime: 3, keywords: ['epicondylitis'] },
  { slug: 'plantar-fasciitis', title: 'Plantar Fasciitis', category: 'sports-overuse', excerpt: 'Inflammation of the plantar fascia, causing heel pain worst with the first steps in the morning.', readTime: 3, keywords: ['heel pain'] },

  // General Rheumatologic Concerns
  { slug: 'joint-pain-evaluation', title: 'Unexplained Joint Pain', category: 'general-rheumatologic', excerpt: 'When joint pain persists, worsens, or presents alongside other symptoms, a rheumatology evaluation can help.', readTime: 4, keywords: ['joint pain','evaluation'] },
  { slug: 'positive-ana', title: 'Positive ANA: What It Means', category: 'general-rheumatologic', excerpt: 'A positive antinuclear antibody test doesn\'t always indicate autoimmune disease — context matters.', readTime: 4, keywords: ['ANA','lab results'] },
  { slug: 'elevated-inflammatory-markers', title: 'Elevated Inflammatory Markers', category: 'general-rheumatologic', excerpt: 'High CRP or ESR can indicate inflammation but requires clinical correlation to interpret.', readTime: 3, keywords: ['CRP','ESR'] },
  { slug: 'morning-stiffness', title: 'Morning Stiffness: Causes & Evaluation', category: 'general-rheumatologic', excerpt: 'Prolonged morning stiffness can be a clue to inflammatory arthritis and warrants evaluation.', readTime: 3, keywords: ['stiffness'] },
];

Object.assign(window, { CATEGORIES, CONDITIONS });
