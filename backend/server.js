import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // charge ta clé API depuis le fichier .env

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // on récupère la clé depuis .env
});

// === ROUTE pour classer un véhicule ===
app.post("/api/classify", async (req, res) => {
  const { vehicle } = req.body; // ex: "Fiat 500"

  // le prompt que tu enverras à ChatGPT
  const prompt = `
Tu es un assistant spécialisé dans la classification des véhicules pour un service de nettoyage automobile. 
L'utilisateur peut saisir librement la marque, le modèle, le type ou une description de son véhicule.

Voici les catégories à utiliser pour classer chaque véhicule :

1. Cabine utilitaire → véhicules utilitaires légers uniquement, camionnettes ou fourgons adaptés à un nettoyage standard (poids < 3,5 tonnes). Ne pas inclure les poids lourds.  
2. Citadine ou Compacte ou Coupé → petites voitures ou compactes urbaines, citadines, coupés de taille réduite.  
3. Berline ou Break ou Mini SUV → voitures de taille moyenne, berlines, breaks, petits SUV.  
4. Grand SUV ou Monospace → SUV de grande taille, grands monospaces ou véhicules familiaux volumineux.  
5. Demande sur mesure → véhicules atypiques, poids lourds, véhicules très grands, luxe, supercars ou tout ce qui ne correspond pas aux catégories ci-dessus.

Instructions :

- Analyse attentivement le texte fourni par l’utilisateur et choisis exactement une catégorie parmi celles listées.  
- Répond uniquement par le nom exact de la catégorie, sans phrase ni explication.  
- Si le véhicule est un poids lourd, un camion ou un véhicule exceptionnel (par exemple Volvo FH16 Aero, Scania, tracteur routier), répond Demande sur mesure.  
- Tolère les fautes de frappe et les abréviations courantes des modèles ou marques.  
- Si l'information est ambiguë, préfère Demande sur mesure plutôt que d’assigner incorrectement Cabine utilitaire ou autre.

Voici maintenant le véhicule à classer : ${vehicle}
  `;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // modèle rapide et économique
      messages: [{ role: "system", content: prompt }],
    });

    const answer = completion.choices[0].message.content.trim();
    res.json({ category: answer });
  } catch (error) {
    console.error("Erreur API OpenAI:", error);
    res.status(500).json({ error: "Erreur lors de la classification" });
  }
});

app.listen(3000, () => console.log("✅ Serveur API sur http://localhost:3000"));
