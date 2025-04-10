import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, LineChart, Users, Star, Repeat, Target, MessageCircle } from "lucide-react";

// Code complet du dashboard avec intégration IA ici (version générée précédemment)
export default function Dashboard() {
  const [data, setData] = useState({ leads: 0, revenue: 0, clients: 0, rating: 0 });
  const [objectif, setObjectif] = useState("");
  const [ton, setTon] = useState("");
  const [campagne, setCampagne] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/summary", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleGenerateCampaign = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/generate-campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ objectif, ton }),
    });
    const result = await res.json();
    setCampagne(result.content);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Tableau de Bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Users className="w-6 h-6" />
            <div>
              <p className="text-sm text-muted-foreground">Nouveaux Leads</p>
              <p className="text-xl font-semibold">{data.leads}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <LineChart className="w-6 h-6" />
            <div>
              <p className="text-sm text-muted-foreground">Revenu ce mois</p>
              <p className="text-xl font-semibold">{parseFloat(data.revenue || 0).toFixed(2)} €</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Repeat className="w-6 h-6" />
            <div>
              <p className="text-sm text-muted-foreground">Clients Récurrents</p>
              <p className="text-xl font-semibold">{data.clients}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Star className="w-6 h-6" />
            <div>
              <p className="text-sm text-muted-foreground">Avis Positifs</p>
              <p className="text-xl font-semibold">{data.rating} ★</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="campagnes" className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="campagnes">Campagnes</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="avis">Avis</TabsTrigger>
          <TabsTrigger value="fidélisation">Fidélisation</TabsTrigger>
          <TabsTrigger value="crm">CRM Patients</TabsTrigger>
        </TabsList>
        <TabsContent value="campagnes">
          <Card className="mt-4">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm mb-1">Objectif de la campagne</p>
                <Input value={objectif} onChange={(e) => setObjectif(e.target.value)} placeholder="Ex: remplir les créneaux du jeudi" />
              </div>
              <div>
                <p className="text-sm mb-1">Ton du message</p>
                <Input value={ton} onChange={(e) => setTon(e.target.value)} placeholder="Professionnel, rassurant, élégant..." />
              </div>
              <Button onClick={handleGenerateCampaign}>Générer une campagne IA</Button>
              {campagne && <Textarea className="mt-4" rows={10} value={campagne} readOnly />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
