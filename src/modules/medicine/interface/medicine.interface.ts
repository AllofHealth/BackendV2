export interface CreateMedicineInterface {
  productPrescribed: string;
  productCategory: string;
  productDosage: string;
  practitionerNote: string;
}

export interface CreateReceiptInterface {
  productDispensed: string;
  directions: string;
  quantity: string;
  price: string;
}

export interface DrugClassDescriptionInterface {
  name: string;
  description: string;
}

export const drugClassesDescription: DrugClassDescriptionInterface[] = [
  {
    name: 'Analgesics',
    description: 'Pain relievers (e.g., Acetaminophen, Ibuprofen)',
  },
  {
    name: 'Antibiotics',
    description:
      'Drugs used to treat bacterial infections (e.g., Amoxicillin, Azithromycin)',
  },
  {
    name: 'Anticoagulants',
    description: 'Blood thinners (e.g., Warfarin, Heparin)',
  },
  {
    name: 'Antidepressants',
    description: 'Used to treat depression (e.g., Fluoxetine, Sertraline)',
  },
  {
    name: 'Antidiabetics',
    description: 'Used to manage diabetes (e.g., Metformin, Insulin)',
  },
  {
    name: 'Antihistamines',
    description: 'Allergy medications (e.g., Diphenhydramine, Loratadine)',
  },
  {
    name: 'Antihypertensives',
    description: 'Blood pressure medications (e.g., Lisinopril, Amlodipine)',
  },
  {
    name: 'Antipsychotics',
    description:
      'Used to treat psychiatric conditions (e.g., Olanzapine, Risperidone)',
  },
  {
    name: 'Bronchodilators',
    description:
      'Used to treat respiratory issues like asthma (e.g., Albuterol, Salmeterol)',
  },
  {
    name: 'Corticosteroids',
    description:
      'Used to reduce inflammation (e.g., Prednisone, Hydrocortisone)',
  },
  {
    name: 'Diuretics',
    description:
      'Increase urine output (e.g., Furosemide, Hydrochlorothiazide)',
  },
  {
    name: 'Hormones',
    description: 'Hormonal treatments (e.g., Estrogen, Testosterone)',
  },
  {
    name: 'Immunosuppressants',
    description: 'Suppress the immune system (e.g., Cyclosporine, Tacrolimus)',
  },
  {
    name: 'Lipid-Lowering Agents',
    description: 'Manage cholesterol levels (e.g., Atorvastatin, Simvastatin)',
  },
  {
    name: 'Muscle Relaxants',
    description: 'Reduce muscle spasms (e.g., Baclofen, Cyclobenzaprine)',
  },
  {
    name: 'Sedatives/Hypnotics',
    description: 'Induce sleep or relaxation (e.g., Zolpidem, Diazepam)',
  },
  {
    name: 'Vitamins/Minerals',
    description: 'Dietary supplements (e.g., Vitamin D, Iron supplements)',
  },
  {
    name: 'Antivirals',
    description:
      'Used to treat viral infections (e.g., Acyclovir, Oseltamivir)',
  },
  {
    name: 'Antifungals',
    description: 'Treat fungal infections (e.g., Fluconazole, Terbinafine)',
  },
  {
    name: 'Antiemetics',
    description:
      'Prevent nausea and vomiting (e.g., Ondansetron, Metoclopramide)',
  },
  {
    name: 'Anesthetics',
    description: 'Local and general anesthetics (e.g., Lidocaine, Propofol)',
  },
  {
    name: 'Anthelmintics',
    description: 'Treat parasitic worm infections (e.g., Albendazole)',
  },
  {
    name: 'Anticholinergics',
    description: 'Block the action of acetylcholine (e.g., Atropine)',
  },
  {
    name: 'Anticonvulsants',
    description: 'Used for seizure control (e.g., Phenytoin, Valproate)',
  },
  {
    name: 'Anti-inflammatory Agents',
    description: 'NSAIDs for inflammation (e.g., Ibuprofen, Naproxen)',
  },
  {
    name: 'Antimigraine Agents',
    description: 'Treat migraines (e.g., Sumatriptan)',
  },
  {
    name: 'Antineoplastics',
    description:
      'Cancer chemotherapy drugs (e.g., Doxorubicin, Cyclophosphamide)',
  },
  {
    name: 'Antiparasitics',
    description: 'Treat parasitic infections (e.g., Metronidazole, Ivermectin)',
  },
  {
    name: 'Beta-Blockers',
    description: 'Reduce blood pressure (e.g., Propranolol, Metoprolol)',
  },
  {
    name: 'Calcium Channel Blockers',
    description: 'Manage hypertension and angina (e.g., Amlodipine)',
  },
  {
    name: 'Immunomodulators',
    description:
      'Modify immune responses (e.g., Interferons, Glatiramer acetate)',
  },
  {
    name: 'Opioid Analgesics',
    description: 'Pain relief (e.g., Morphine, Fentanyl)',
  },
  {
    name: 'Thrombolytics',
    description: 'Break down blood clots (e.g., Alteplase)',
  },
  {
    name: 'Uricosurics',
    description: 'Manage gout (e.g., Allopurinol)',
  },
  {
    name: 'Antitubercular Agents',
    description: 'Treat tuberculosis (e.g., Isoniazid, Rifampin)',
  },
  {
    name: 'Antiparkinson Agents',
    description: 'Manage Parkinson’s disease (e.g., Levodopa, Carbidopa)',
  },
  {
    name: 'Bisphosphonates',
    description: 'Prevent bone density loss (e.g., Alendronate)',
  },
  {
    name: 'Contraceptives',
    description: 'Birth control (e.g., Ethinyl estradiol, Levonorgestrel)',
  },
  {
    name: 'Expectorants and Mucolytics',
    description:
      'Facilitate mucus clearance (e.g., Guaifenesin, Acetylcysteine)',
  },
  {
    name: 'Gastrointestinal Agents',
    description:
      'Proton pump inhibitors and H2-receptor antagonists (e.g., Omeprazole, Ranitidine)',
  },
  {
    name: 'Hormone Replacement Therapy',
    description: 'Manage hormone deficiencies (e.g., Estradiol, Levothyroxine)',
  },
  {
    name: 'Hypoglycemics',
    description: 'Control blood sugar levels (e.g., Glipizide, Pioglitazone)',
  },
  {
    name: 'Antianginal Agents',
    description: 'Used for chest pain management (e.g., Nitroglycerin)',
  },
  {
    name: 'Nootropics',
    description: 'Cognitive enhancers (e.g., Piracetam, Modafinil)',
  },
  {
    name: 'Antiglaucoma Agents',
    description: 'Manage glaucoma (e.g., Timolol, Latanoprost)',
  },
];
