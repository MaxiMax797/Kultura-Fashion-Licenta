const Review = require("../models/Review");

const reviews = [
  {
    "_id": "65c252e3dcd9253acfbaa76d",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599444f",
    "rating": 5,
    "comment": "Cea mai bună șapcă pe care am avut-o vreodată! Materialul este foarte confortabil și se potrivește perfect.",
    "createdAt": "2025-04-22T09:30:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa76e",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599444f",
    "rating": 3,
    "comment": "Designul este frumos, dar mă așteptam să fie mai rezistentă. După câteva spălări, a început să se uzeze.",
    "createdAt": "2025-04-21T14:45:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa76f",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994450",
    "rating": 4,
    "comment": "Foarte bună calitate, dar culorile par puțin mai deschise decât în poze.",
    "createdAt": "2025-04-22T10:15:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa770",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994451",
    "rating": 2,
    "comment": "Materialul se strânge după spălare și nu mai arată la fel de bine. Nu recomand.",
    "createdAt": "2025-04-21T16:20:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa771",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994452",
    "rating": 5,
    "comment": "Super confortabili și rezistenți! Perfecti pentru activități outdoor.",
    "createdAt": "2025-04-22T11:10:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa772",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994453",
    "rating": 4,
    "comment": "Foarte spațios și util pentru călătorii. Singurul minus este că fermoarul se blochează uneori.",
    "createdAt": "2025-04-21T17:30:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa773",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994454",
    "rating": 1,
    "comment": "Foarte dezamăgit! S-a rupt după o săptămână de folosire. Calitate slabă.",
    "createdAt": "2025-04-22T12:05:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa774",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994455",
    "rating": 5,
    "comment": "Super confortabili și izolați bine de frig. Recomand pentru iarnă!",
    "createdAt": "2025-04-21T18:40:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa775",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994456",
    "rating": 3,
    "comment": "Designul este interesant, dar talpa este prea rigidă și nu foarte comodă.",
    "createdAt": "2025-04-22T13:20:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa776",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994457",
    "rating": 4,
    "comment": "Material foarte plăcut și design elegant. Se poartă superb la office.",
    "createdAt": "2025-04-21T19:50:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa777",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994458",
    "rating": 2,
    "comment": "Culoarea diferă de cea din poză, iar materialul se încrețește foarte ușor.",
    "createdAt": "2025-04-22T14:35:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa778",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994459",
    "rating": 5,
    "comment": "Perfectă pentru fanii Yankees! Foarte bine făcută și rezistentă.",
    "createdAt": "2025-04-21T20:15:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa779",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445a",
    "rating": 4,
    "comment": "Stilul este foarte cool, dar mărimea este puțin mai mică decât mă așteptam.",
    "createdAt": "2024-04-22T15:50:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa77a",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445b",
    "rating": 3,
    "comment": "Arată bine, dar lentilele se zgârie ușor. Decent pentru preț.",
    "createdAt": "2024-04-21T21:25:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa77b",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445c",
    "rating": 1,
    "comment": "Foarte proastă calitate. S-au rupt după două zile de folosire.",
    "createdAt": "2024-04-22T16:40:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa77c",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445d",
    "rating": 5,
    "comment": "Superbe! Super confortabile și arată fantastic. Recomand cu încredere!",
    "createdAt": "2024-04-21T22:10:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa77d",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445e",
    "rating": 4,
    "comment": "Foarte calde și elegante, dar prețul este puțin cam mare.",
    "createdAt": "2024-04-22T17:55:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa77e",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445f",
    "rating": 3,
    "comment": "Buni pentru plajă, dar nu sunt foarte rezistenți la uzură.",
    "createdAt": "2024-04-21T23:30:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa77f",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994460",
    "rating": 2,
    "comment": "Nu sunt la fel de confortabili cum speram. Talpa este prea subțire.",
    "createdAt": "2024-04-22T18:45:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa780",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994461",
    "rating": 5,
    "comment": "Material excelent și culori vibrante! Foarte mulțumit de achiziție.",
    "createdAt": "2024-04-22T00:05:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbaa781",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994462",
    "rating": 4,
    "comment": "Foarte stylish și confortabil, dar se încrețește ușor.",
    "createdAt": "2024-04-21T19:20:00.000Z"
  },
  {
    "_id": "65c252e3dcd9253acfbad500",
    "user": "65c2526fdcd9253acfbab001",
    "product": "65b3f7a812e34c67d8921a70",
    "rating": 4,
    "comment": "L-am achiziţionat pentru fiica mea. Raportul calitate-preț este excelent pentru acest segment. Totuși, ar fi de apreciat dacă ar exista mai multe opțiuni în ceea ce privește nuanțele de culoare disponibile.",
    "createdAt": "2024-05-15T14:30:00.000Z"
  },
];

exports.seedReview = async () => {
  try {
    await Review.insertMany(reviews);
    console.log("Review seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
