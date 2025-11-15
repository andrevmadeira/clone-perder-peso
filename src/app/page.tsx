"use client";

import { useState, useEffect } from "react";
import { 
  Flame, 
  Target, 
  TrendingUp, 
  Calendar, 
  Award, 
  Play,
  CheckCircle2,
  Lock,
  ChevronRight,
  Activity,
  Zap,
  Clock,
  Utensils,
  Apple,
  Coffee,
  Salad,
  User,
  Scale,
  Ruler,
  AlertCircle,
  Heart,
  Dumbbell,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LandingPage from "@/components/custom/landing-page";
import Paywall from "@/components/custom/paywall";

interface Exercise {
  name: string;
  duration: string;
  calories: number;
  sets?: string;
}

interface Workout {
  day: number;
  title: string;
  duration: string;
  calories: number;
  difficulty: "Fácil" | "Médio" | "Difícil";
  exercises: Exercise[];
  completed: boolean;
  locked: boolean;
}

interface UserData {
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: "masculino" | "feminino";
  goal: "perder" | "manter" | "ganhar";
  restrictions: string[];
  activityLevel: "sedentario" | "leve" | "moderado" | "intenso";
  fitnessLevel: "iniciante" | "intermediario" | "avancado";
  workoutLocation: "casa" | "academia" | "ambos";
  availableTime: "15" | "30" | "45" | "60";
  healthConditions: string[];
  motivation: string;
}

interface Meal {
  name: string;
  time: string;
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface DietPlan {
  dailyCalories: number;
  meals: Meal[];
  waterIntake: number;
  tips: string[];
}

interface SubscriptionStatus {
  isPremium: boolean;
}

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [showPaywall, setShowPaywall] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    isPremium: false
  });
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: 0,
    weight: 0,
    height: 0,
    gender: "masculino",
    goal: "perder",
    restrictions: [],
    activityLevel: "leve",
    fitnessLevel: "iniciante",
    workoutLocation: "casa",
    availableTime: "30",
    healthConditions: [],
    motivation: ""
  });

  const [currentDay, setCurrentDay] = useState(1);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [activeTab, setActiveTab] = useState("treinos");

  // Verificar status de assinatura ao carregar
  useEffect(() => {
    const savedUserData = localStorage.getItem("forcaDiariaUserData");
    const savedSubscription = localStorage.getItem("forcaDiariaSubscription");
    
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setShowLanding(false);
      setShowOnboarding(false);
    }

    if (savedSubscription) {
      const subscription = JSON.parse(savedSubscription);
      setSubscriptionStatus(subscription);

      // Mostrar paywall se não é premium
      if (!subscription.isPremium) {
        setShowPaywall(true);
      }
    } else if (savedUserData) {
      // Criar nova assinatura se usuário existe mas não tem subscription
      const newSubscription = {
        isPremium: false
      };
      localStorage.setItem("forcaDiariaSubscription", JSON.stringify(newSubscription));
      setSubscriptionStatus(newSubscription);
      setShowPaywall(true);
    }
  }, []);

  // Salvar dados no localStorage
  const saveUserData = () => {
    localStorage.setItem("forcaDiariaUserData", JSON.stringify(userData));
    
    // Criar assinatura não-premium
    const newSubscription = {
      isPremium: false
    };
    localStorage.setItem("forcaDiariaSubscription", JSON.stringify(newSubscription));
    setSubscriptionStatus(newSubscription);
    
    setShowOnboarding(false);
    setShowPaywall(true); // Mostrar paywall imediatamente
  };

  // Handler para começar do landing
  const handleGetStarted = () => {
    setShowLanding(false);
    setShowOnboarding(true);
  };

  // Handler para upgrade
  const handleUpgrade = () => {
    // Redirecionar para o link de pagamento do produto
    window.location.href = "https://pay.lasy.com.br/forcadiara";
  };

  // Verificar acesso antes de ações importantes
  const checkAccess = (): boolean => {
    if (subscriptionStatus.isPremium) return true;
    
    setShowPaywall(true);
    return false;
  };

  // Calcular TMB (Taxa Metabólica Basal) usando fórmula de Harris-Benedict
  const calculateTMB = (): number => {
    if (userData.gender === "masculino") {
      return 88.362 + (13.397 * userData.weight) + (4.799 * userData.height) - (5.677 * userData.age);
    } else {
      return 447.593 + (9.247 * userData.weight) + (3.098 * userData.height) - (4.330 * userData.age);
    }
  };

  // Calcular calorias diárias baseado no nível de atividade e objetivo
  const calculateDailyCalories = (): number => {
    const tmb = calculateTMB();
    let activityMultiplier = 1.2;
    
    switch (userData.activityLevel) {
      case "sedentario": activityMultiplier = 1.2; break;
      case "leve": activityMultiplier = 1.375; break;
      case "moderado": activityMultiplier = 1.55; break;
      case "intenso": activityMultiplier = 1.725; break;
    }

    let calories = tmb * activityMultiplier;

    // Ajustar baseado no objetivo
    if (userData.goal === "perder") {
      calories -= 500; // Déficit calórico
    } else if (userData.goal === "ganhar") {
      calories += 300; // Superávit calórico
    }

    return Math.round(calories);
  };

  // Gerar plano de dieta personalizado
  const generateDietPlan = (): DietPlan => {
    const dailyCalories = calculateDailyCalories();
    const hasVegetarian = userData.restrictions.includes("vegetariano");
    const hasVegan = userData.restrictions.includes("vegano");
    const hasLactose = userData.restrictions.includes("lactose");
    const hasGluten = userData.restrictions.includes("gluten");

    // Distribuição de macros baseada no objetivo
    let proteinPercent = 0.30;
    let carbsPercent = 0.40;
    let fatsPercent = 0.30;

    if (userData.goal === "ganhar") {
      proteinPercent = 0.35;
      carbsPercent = 0.45;
      fatsPercent = 0.20;
    } else if (userData.goal === "perder") {
      proteinPercent = 0.35;
      carbsPercent = 0.30;
      fatsPercent = 0.35;
    }

    const proteinCals = dailyCalories * proteinPercent;
    const carbsCals = dailyCalories * carbsPercent;
    const fatsCals = dailyCalories * fatsPercent;

    // Converter calorias em gramas (proteína: 4cal/g, carbs: 4cal/g, gordura: 9cal/g)
    const proteinGrams = Math.round(proteinCals / 4);
    const carbsGrams = Math.round(carbsCals / 4);
    const fatsGrams = Math.round(fatsCals / 9);

    // Criar refeições personalizadas
    const meals: Meal[] = [];

    // Café da manhã (25% das calorias)
    const breakfastCals = Math.round(dailyCalories * 0.25);
    const breakfastFoods = [];
    
    if (!hasGluten) {
      breakfastFoods.push("2 fatias de pão integral");
    } else {
      breakfastFoods.push("Tapioca com ovo");
    }

    if (!hasVegan && !hasLactose) {
      breakfastFoods.push("2 ovos mexidos");
      breakfastFoods.push("1 copo de leite desnatado");
    } else if (!hasVegan) {
      breakfastFoods.push("3 ovos mexidos");
      breakfastFoods.push("Leite vegetal");
    } else {
      breakfastFoods.push("Pasta de amendoim");
      breakfastFoods.push("Leite de aveia");
    }

    breakfastFoods.push("1 banana");
    breakfastFoods.push("Café ou chá sem açúcar");

    meals.push({
      name: "Café da Manhã",
      time: "07:00 - 08:00",
      foods: breakfastFoods,
      calories: breakfastCals,
      protein: Math.round(proteinGrams * 0.25),
      carbs: Math.round(carbsGrams * 0.25),
      fats: Math.round(fatsGrams * 0.25)
    });

    // Lanche da manhã (10% das calorias)
    const snack1Cals = Math.round(dailyCalories * 0.10);
    const snack1Foods = [];

    if (!hasLactose && !hasVegan) {
      snack1Foods.push("1 iogurte grego natural");
    } else {
      snack1Foods.push("1 iogurte vegetal");
    }
    snack1Foods.push("1 porção de frutas vermelhas");
    snack1Foods.push("1 colher de sopa de granola");

    meals.push({
      name: "Lanche da Manhã",
      time: "10:00 - 10:30",
      foods: snack1Foods,
      calories: snack1Cals,
      protein: Math.round(proteinGrams * 0.10),
      carbs: Math.round(carbsGrams * 0.10),
      fats: Math.round(fatsGrams * 0.10)
    });

    // Almoço (35% das calorias)
    const lunchCals = Math.round(dailyCalories * 0.35);
    const lunchFoods = [];

    if (!hasVegetarian && !hasVegan) {
      if (userData.goal === "ganhar") {
        lunchFoods.push("200g de frango grelhado");
      } else {
        lunchFoods.push("150g de frango grelhado ou peixe");
      }
    } else {
      lunchFoods.push("150g de tofu grelhado ou grão de bico");
    }

    if (!hasGluten) {
      lunchFoods.push("4 colheres de arroz integral");
    } else {
      lunchFoods.push("1 batata doce média");
    }

    lunchFoods.push("Salada verde à vontade");
    lunchFoods.push("Legumes cozidos (brócolis, cenoura)");
    lunchFoods.push("1 colher de azeite extra virgem");

    meals.push({
      name: "Almoço",
      time: "12:00 - 13:00",
      foods: lunchFoods,
      calories: lunchCals,
      protein: Math.round(proteinGrams * 0.35),
      carbs: Math.round(carbsGrams * 0.35),
      fats: Math.round(fatsGrams * 0.35)
    });

    // Lanche da tarde (10% das calorias)
    const snack2Cals = Math.round(dailyCalories * 0.10);
    const snack2Foods = [
      "1 punhado de castanhas mistas",
      "1 maçã ou pera",
      "Chá verde"
    ];

    meals.push({
      name: "Lanche da Tarde",
      time: "15:30 - 16:00",
      foods: snack2Foods,
      calories: snack2Cals,
      protein: Math.round(proteinGrams * 0.10),
      carbs: Math.round(carbsGrams * 0.10),
      fats: Math.round(fatsGrams * 0.10)
    });

    // Jantar (20% das calorias)
    const dinnerCals = Math.round(dailyCalories * 0.20);
    const dinnerFoods = [];

    if (!hasVegetarian && !hasVegan) {
      dinnerFoods.push("120g de peixe ou frango");
    } else {
      dinnerFoods.push("100g de proteína vegetal");
    }

    dinnerFoods.push("Sopa de legumes");
    dinnerFoods.push("Salada verde");
    dinnerFoods.push("1 fatia de abacaxi");

    meals.push({
      name: "Jantar",
      time: "19:00 - 20:00",
      foods: dinnerFoods,
      calories: dinnerCals,
      protein: Math.round(proteinGrams * 0.20),
      carbs: Math.round(carbsGrams * 0.20),
      fats: Math.round(fatsGrams * 0.20)
    });

    // Dicas personalizadas
    const tips = [
      `Beba ${Math.round(userData.weight * 35)}ml de água por dia (cerca de ${Math.round((userData.weight * 35) / 250)} copos)`,
      "Evite alimentos processados e açúcares refinados",
      "Faça suas refeições em horários regulares",
      "Mastigue bem os alimentos e coma devagar"
    ];

    if (userData.goal === "perder") {
      tips.push("Evite comer 3 horas antes de dormir");
      tips.push("Priorize alimentos com baixo índice glicêmico");
    } else if (userData.goal === "ganhar") {
      tips.push("Não pule refeições, especialmente o café da manhã");
      tips.push("Adicione snacks saudáveis entre as refeições");
    }

    if (hasVegetarian || hasVegan) {
      tips.push("Combine diferentes fontes de proteína vegetal");
      tips.push("Considere suplementar vitamina B12");
    }

    return {
      dailyCalories,
      meals,
      waterIntake: Math.round((userData.weight * 35) / 250),
      tips
    };
  };

  // Dados dos treinos (30 dias)
  const workouts: Workout[] = [
    {
      day: 1,
      title: "Iniciante - Corpo Todo",
      duration: "15 min",
      calories: 120,
      difficulty: "Fácil",
      exercises: [
        { name: "Polichinelos", duration: "30s", calories: 15 },
        { name: "Agachamento", duration: "45s", calories: 20, sets: "3x" },
        { name: "Flexões (joelhos)", duration: "30s", calories: 18, sets: "2x" },
        { name: "Prancha", duration: "20s", calories: 12 },
        { name: "Abdominais", duration: "45s", calories: 25, sets: "3x" },
        { name: "Alongamento", duration: "2 min", calories: 10 }
      ],
      completed: false,
      locked: false
    },
    {
      day: 2,
      title: "Cardio Básico",
      duration: "18 min",
      calories: 150,
      difficulty: "Fácil",
      exercises: [
        { name: "Corrida no lugar", duration: "1 min", calories: 25 },
        { name: "Mountain Climbers", duration: "30s", calories: 20, sets: "3x" },
        { name: "Burpees modificados", duration: "30s", calories: 30, sets: "2x" },
        { name: "Jumping Jacks", duration: "45s", calories: 20, sets: "3x" },
        { name: "High Knees", duration: "30s", calories: 25, sets: "3x" },
        { name: "Descanso ativo", duration: "2 min", calories: 10 }
      ],
      completed: false,
      locked: true
    },
    {
      day: 3,
      title: "Força - Parte Superior",
      duration: "20 min",
      calories: 140,
      difficulty: "Médio",
      exercises: [
        { name: "Flexões", duration: "45s", calories: 25, sets: "3x" },
        { name: "Tríceps no chão", duration: "30s", calories: 20, sets: "3x" },
        { name: "Prancha lateral", duration: "20s cada", calories: 15, sets: "2x" },
        { name: "Superman", duration: "30s", calories: 18, sets: "3x" },
        { name: "Abdominais bicicleta", duration: "45s", calories: 22, sets: "3x" },
        { name: "Alongamento", duration: "2 min", calories: 10 }
      ],
      completed: false,
      locked: true
    },
    {
      day: 4,
      title: "Descanso Ativo",
      duration: "10 min",
      calories: 50,
      difficulty: "Fácil",
      exercises: [
        { name: "Caminhada leve", duration: "5 min", calories: 25 },
        { name: "Alongamento completo", duration: "5 min", calories: 25 }
      ],
      completed: false,
      locked: true
    },
    {
      day: 5,
      title: "Pernas e Glúteos",
      duration: "22 min",
      calories: 180,
      difficulty: "Médio",
      exercises: [
        { name: "Agachamento", duration: "1 min", calories: 30, sets: "4x" },
        { name: "Afundo alternado", duration: "45s", calories: 28, sets: "3x" },
        { name: "Ponte de glúteos", duration: "45s", calories: 25, sets: "4x" },
        { name: "Agachamento sumô", duration: "45s", calories: 27, sets: "3x" },
        { name: "Elevação de panturrilha", duration: "30s", calories: 20, sets: "3x" },
        { name: "Alongamento", duration: "3 min", calories: 15 }
      ],
      completed: false,
      locked: true
    }
  ];

  // Adicionar mais 25 dias
  for (let i = 6; i <= 30; i++) {
    workouts.push({
      day: i,
      title: i % 7 === 0 ? "Descanso Ativo" : `Treino Dia ${i}`,
      duration: i % 7 === 0 ? "10 min" : `${15 + Math.floor(i / 3)} min`,
      calories: i % 7 === 0 ? 50 : 120 + (i * 5),
      difficulty: i < 10 ? "Fácil" : i < 20 ? "Médio" : "Difícil",
      exercises: [
        { name: "Aquecimento", duration: "3 min", calories: 20 },
        { name: "Exercício principal", duration: "10 min", calories: 80 },
        { name: "Alongamento", duration: "2 min", calories: 10 }
      ],
      completed: false,
      locked: i > 1
    });
  }

  const progressPercentage = (completedDays.length / 30) * 100;
  const daysRemaining = 30 - completedDays.length;

  const completeWorkout = (day: number) => {
    if (!checkAccess()) return;
    
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day]);
      const workout = workouts.find(w => w.day === day);
      if (workout) {
        setTotalCaloriesBurned(totalCaloriesBurned + workout.calories);
      }
      if (day < 30) {
        workouts[day].locked = false;
      }
    }
    setIsWorkoutActive(false);
    setSelectedWorkout(null);
  };

  // Renderizar landing page
  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Renderizar questionário de onboarding
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              Bem-vindo ao ForçaDiaria!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Vamos personalizar seu plano de treinos e dieta
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step === onboardingStep
                      ? "w-8 bg-gradient-to-r from-orange-500 to-red-500"
                      : step < onboardingStep
                      ? "w-2 bg-orange-400"
                      : "w-2 bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Etapa 1: Dados Pessoais */}
          {onboardingStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={userData.age || ""}
                    onChange={(e) => setUserData({...userData, age: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Sexo</Label>
                  <select
                    id="gender"
                    className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    value={userData.gender}
                    onChange={(e) => setUserData({...userData, gender: e.target.value as "masculino" | "feminino"})}
                  >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight" className="flex items-center gap-2 mb-2">
                    <Scale className="w-4 h-4" />
                    Peso (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={userData.weight || ""}
                    onChange={(e) => setUserData({...userData, weight: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4" />
                    Altura (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={userData.height || ""}
                    onChange={(e) => setUserData({...userData, height: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>

              <Button
                onClick={() => setOnboardingStep(2)}
                disabled={!userData.name || !userData.age || !userData.weight || !userData.height}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Etapa 2: Objetivo e Atividade */}
          {onboardingStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4" />
                  Qual é o seu objetivo?
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={userData.goal === "perder" ? "default" : "outline"}
                    onClick={() => setUserData({...userData, goal: "perder"})}
                    className={userData.goal === "perder" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""}
                  >
                    Perder Peso
                  </Button>
                  <Button
                    variant={userData.goal === "manter" ? "default" : "outline"}
                    onClick={() => setUserData({...userData, goal: "manter"})}
                    className={userData.goal === "manter" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""}
                  >
                    Manter Peso
                  </Button>
                  <Button
                    variant={userData.goal === "ganhar" ? "default" : "outline"}
                    onClick={() => setUserData({...userData, goal: "ganhar"})}
                    className={userData.goal === "ganhar" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""}
                  >
                    Ganhar Massa
                  </Button>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4" />
                  Nível de atividade física atual
                </Label>
                <div className="space-y-2">
                  {[
                    { value: "sedentario", label: "Sedentário", desc: "Pouco ou nenhum exercício" },
                    { value: "leve", label: "Leve", desc: "Exercício 1-3 dias/semana" },
                    { value: "moderado", label: "Moderado", desc: "Exercício 3-5 dias/semana" },
                    { value: "intenso", label: "Intenso", desc: "Exercício 6-7 dias/semana" }
                  ].map((level) => (
                    <Button
                      key={level.value}
                      variant={userData.activityLevel === level.value ? "default" : "outline"}
                      onClick={() => setUserData({...userData, activityLevel: level.value as any})}
                      className={`w-full justify-start text-left h-auto py-3 ${
                        userData.activityLevel === level.value ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{level.label}</div>
                        <div className="text-xs opacity-80">{level.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setOnboardingStep(1)}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setOnboardingStep(3)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Etapa 3: Experiência e Local de Treino */}
          {onboardingStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Dumbbell className="w-4 h-4" />
                  Qual seu nível de experiência com exercícios?
                </Label>
                <div className="space-y-2">
                  {[
                    { value: "iniciante", label: "Iniciante", desc: "Pouca ou nenhuma experiência" },
                    { value: "intermediario", label: "Intermediário", desc: "Treino há alguns meses" },
                    { value: "avancado", label: "Avançado", desc: "Treino há mais de 1 ano" }
                  ].map((level) => (
                    <Button
                      key={level.value}
                      variant={userData.fitnessLevel === level.value ? "default" : "outline"}
                      onClick={() => setUserData({...userData, fitnessLevel: level.value as any})}
                      className={`w-full justify-start text-left h-auto py-3 ${
                        userData.fitnessLevel === level.value ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{level.label}</div>
                        <div className="text-xs opacity-80">{level.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4" />
                  Onde você prefere treinar?
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={userData.workoutLocation === "casa" ? "default" : "outline"}
                    onClick={() => setUserData({...userData, workoutLocation: "casa"})}
                    className={userData.workoutLocation === "casa" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""}
                  >
                    Em Casa
                  </Button>
                  <Button
                    variant={userData.workoutLocation === "academia" ? "default" : "outline"}
                    onClick={() => setUserData({...userData, workoutLocation: "academia"})}
                    className={userData.workoutLocation === "academia" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""}
                  >
                    Academia
                  </Button>
                  <Button
                    variant={userData.workoutLocation === "ambos" ? "default" : "outline"}
                    onClick={() => setUserData({...userData, workoutLocation: "ambos"})}
                    className={userData.workoutLocation === "ambos" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""}
                  >
                    Ambos
                  </Button>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4" />
                  Quanto tempo você tem disponível por dia?
                </Label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: "15", label: "15 min" },
                    { value: "30", label: "30 min" },
                    { value: "45", label: "45 min" },
                    { value: "60", label: "60 min" }
                  ].map((time) => (
                    <Button
                      key={time.value}
                      variant={userData.availableTime === time.value ? "default" : "outline"}
                      onClick={() => setUserData({...userData, availableTime: time.value as any})}
                      className={userData.availableTime === time.value ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""}
                    >
                      {time.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setOnboardingStep(2)}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setOnboardingStep(4)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Etapa 4: Restrições Alimentares */}
          {onboardingStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4" />
                  Restrições alimentares (opcional)
                </Label>
                <div className="space-y-2">
                  {[
                    { value: "vegetariano", label: "Vegetariano" },
                    { value: "vegano", label: "Vegano" },
                    { value: "lactose", label: "Intolerância à lactose" },
                    { value: "gluten", label: "Intolerância ao glúten" },
                    { value: "nenhuma", label: "Nenhuma restrição" }
                  ].map((restriction) => (
                    <Button
                      key={restriction.value}
                      variant={userData.restrictions.includes(restriction.value) ? "default" : "outline"}
                      onClick={() => {
                        if (restriction.value === "nenhuma") {
                          setUserData({...userData, restrictions: []});
                        } else {
                          const newRestrictions = userData.restrictions.includes(restriction.value)
                            ? userData.restrictions.filter(r => r !== restriction.value)
                            : [...userData.restrictions.filter(r => r !== "nenhuma"), restriction.value];
                          setUserData({...userData, restrictions: newRestrictions});
                        }
                      }}
                      className={`w-full justify-start ${
                        userData.restrictions.includes(restriction.value) ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""
                      }`}
                    >
                      {restriction.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setOnboardingStep(3)}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setOnboardingStep(5)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Etapa 5: Condições de Saúde e Motivação */}
          {onboardingStep === 5 && (
            <div className="space-y-6">
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4" />
                  Possui alguma condição de saúde? (opcional)
                </Label>
                <div className="space-y-2">
                  {[
                    { value: "diabetes", label: "Diabetes" },
                    { value: "hipertensao", label: "Hipertensão" },
                    { value: "problemas_articulares", label: "Problemas articulares" },
                    { value: "problemas_cardiacos", label: "Problemas cardíacos" },
                    { value: "nenhuma", label: "Nenhuma condição" }
                  ].map((condition) => (
                    <Button
                      key={condition.value}
                      variant={userData.healthConditions.includes(condition.value) ? "default" : "outline"}
                      onClick={() => {
                        if (condition.value === "nenhuma") {
                          setUserData({...userData, healthConditions: []});
                        } else {
                          const newConditions = userData.healthConditions.includes(condition.value)
                            ? userData.healthConditions.filter(c => c !== condition.value)
                            : [...userData.healthConditions.filter(c => c !== "nenhuma"), condition.value];
                          setUserData({...userData, healthConditions: newConditions});
                        }
                      }}
                      className={`w-full justify-start ${
                        userData.healthConditions.includes(condition.value) ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""
                      }`}
                    >
                      {condition.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="motivation" className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4" />
                  O que te motiva a começar? (opcional)
                </Label>
                <textarea
                  id="motivation"
                  placeholder="Ex: Quero ter mais energia no dia a dia, melhorar minha saúde..."
                  value={userData.motivation}
                  onChange={(e) => setUserData({...userData, motivation: e.target.value})}
                  className="w-full h-24 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none"
                />
              </div>

              <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  💡 <strong>Dica:</strong> Baseado nos seus dados, vamos criar um plano personalizado de treinos e dieta para você alcançar seus objetivos!
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setOnboardingStep(4)}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={saveUserData}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Começar Agora!
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Renderizar paywall se necessário
  if (showPaywall) {
    return (
      <Paywall onUpgrade={handleUpgrade} />
    );
  }

  // Tela de treino ativo
  if (isWorkoutActive && selectedWorkout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setIsWorkoutActive(false)}
              className="mb-4"
            >
              ← Voltar
            </Button>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-0">
                  Dia {selectedWorkout.day}
                </Badge>
                <Badge className="bg-white/20 text-white border-0">
                  {selectedWorkout.difficulty}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{selectedWorkout.title}</h1>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{selectedWorkout.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  <span>{selectedWorkout.calories} kcal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Exercícios
            </h2>
            {selectedWorkout.exercises.map((exercise, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                        {exercise.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exercise.duration}
                        </span>
                        {exercise.sets && (
                          <span className="text-orange-600 dark:text-orange-400 font-medium">
                            {exercise.sets}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-semibold">
                      <Flame className="w-5 h-5" />
                      {exercise.calories}
                    </div>
                    <span className="text-xs text-gray-500">kcal</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button
            onClick={() => completeWorkout(selectedWorkout.day)}
            className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-2xl"
          >
            <CheckCircle2 className="w-6 h-6 mr-2" />
            Completar Treino
          </Button>
        </div>
      </div>
    );
  }

  const dietPlan = generateDietPlan();

  // Tela principal com abas
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                ForçaDiaria
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Olá, {userData.name}! 👋
              </p>
            </div>
          </div>

          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8" />
                <TrendingUp className="w-6 h-6 opacity-70" />
              </div>
              <div className="text-3xl font-bold mb-1">{completedDays.length}</div>
              <div className="text-orange-100 text-sm">Dias Completados</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-8 h-8" />
                <Activity className="w-6 h-6 opacity-70" />
              </div>
              <div className="text-3xl font-bold mb-1">{totalCaloriesBurned}</div>
              <div className="text-red-100 text-sm">Calorias Queimadas</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-600 to-red-500 text-white border-0 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8" />
                <Award className="w-6 h-6 opacity-70" />
              </div>
              <div className="text-3xl font-bold mb-1">{daysRemaining}</div>
              <div className="text-orange-100 text-sm">Dias Restantes</div>
            </Card>
          </div>

          {/* Barra de progresso */}
          <Card className="p-6 shadow-xl border-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                Progresso do Desafio
              </h3>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {completedDays.length} de 30 dias completados
            </p>
          </Card>
        </div>

        {/* Tabs: Treinos e Dieta */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="treinos" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Treinos
            </TabsTrigger>
            <TabsTrigger value="dieta" className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Plano de Dieta
            </TabsTrigger>
          </TabsList>

          {/* Aba de Treinos */}
          <TabsContent value="treinos">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                <Zap className="w-7 h-7 text-orange-600" />
                Plano de Treinos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workouts.map((workout) => {
                  const isCompleted = completedDays.includes(workout.day);
                  const isLocked = workout.locked && !isCompleted;

                  return (
                    <Card
                      key={workout.day}
                      className={`p-6 transition-all duration-300 cursor-pointer border-2 ${
                        isCompleted
                          ? "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-300 dark:border-orange-700"
                          : isLocked
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:shadow-2xl hover:scale-105 hover:border-orange-400"
                      }`}
                      onClick={() => {
                        if (!isLocked && checkAccess()) {
                          setSelectedWorkout(workout);
                          setIsWorkoutActive(true);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                              isCompleted
                                ? "bg-gradient-to-br from-orange-500 to-red-500 text-white"
                                : isLocked
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-400"
                                : "bg-gradient-to-br from-orange-400 to-red-400 text-white"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : isLocked ? (
                              <Lock className="w-6 h-6" />
                            ) : (
                              workout.day
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                              {workout.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`mt-1 ${
                                workout.difficulty === "Fácil"
                                  ? "border-green-500 text-green-600 dark:text-green-400"
                                  : workout.difficulty === "Médio"
                                  ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                                  : "border-red-500 text-red-600 dark:text-red-400"
                              }`}
                            >
                              {workout.difficulty}
                            </Badge>
                          </div>
                        </div>
                        {!isLocked && !isCompleted && (
                          <ChevronRight className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{workout.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
                          <Flame className="w-4 h-4" />
                          <span>{workout.calories} kcal</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          <span>{workout.exercises.length} exercícios</span>
                        </div>
                      </div>

                      {isCompleted && (
                        <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
                          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Completado!</span>
                          </div>
                        </div>
                      )}

                      {!isLocked && !isCompleted && (
                        <Button
                          className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (checkAccess()) {
                              setSelectedWorkout(workout);
                              setIsWorkoutActive(true);
                            }
                          }}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Iniciar Treino
                        </Button>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Motivação */}
            <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <Award className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-bold">Continue Firme!</h3>
                  <p className="text-orange-100">
                    Cada treino te aproxima do seu objetivo
                  </p>
                </div>
              </div>
              <p className="text-white/90 mb-4">
                💪 Você está fazendo um ótimo trabalho! Mantenha a consistência e os
                resultados virão.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Zap className="w-4 h-4" />
                <span>Dica: Beba bastante água e descanse bem entre os treinos</span>
              </div>
            </Card>
          </TabsContent>

          {/* Aba de Dieta */}
          <TabsContent value="dieta">
            <div className="space-y-6">
              {/* Resumo nutricional */}
              <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <Apple className="w-12 h-12" />
                  <div>
                    <h2 className="text-2xl font-bold">Seu Plano Nutricional</h2>
                    <p className="text-orange-100">
                      Personalizado para {userData.goal === "perder" ? "perder peso" : userData.goal === "ganhar" ? "ganhar massa" : "manter o peso"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{dietPlan.dailyCalories}</div>
                    <div className="text-sm text-orange-100">Calorias/dia</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{Math.round(dietPlan.dailyCalories * 0.30 / 4)}g</div>
                    <div className="text-sm text-orange-100">Proteínas</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{Math.round(dietPlan.dailyCalories * 0.40 / 4)}g</div>
                    <div className="text-sm text-orange-100">Carboidratos</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{Math.round(dietPlan.dailyCalories * 0.30 / 9)}g</div>
                    <div className="text-sm text-orange-100">Gorduras</div>
                  </div>
                </div>
              </Card>

              {/* Refeições do dia */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-orange-600" />
                  Refeições do Dia
                </h3>
                <div className="space-y-4">
                  {dietPlan.meals.map((meal, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white">
                            {index === 0 && <Coffee className="w-6 h-6" />}
                            {index === 1 && <Apple className="w-6 h-6" />}
                            {index === 2 && <Utensils className="w-6 h-6" />}
                            {index === 3 && <Apple className="w-6 h-6" />}
                            {index === 4 && <Salad className="w-6 h-6" />}
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                              {meal.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {meal.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {meal.calories}
                          </div>
                          <div className="text-xs text-gray-500">kcal</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {meal.foods.map((food, foodIndex) => (
                          <div key={foodIndex} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <span>{food}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-600 dark:text-gray-400">Proteína:</span>
                          <span className="text-orange-600 dark:text-orange-400 font-bold">{meal.protein}g</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-600 dark:text-gray-400">Carbs:</span>
                          <span className="text-orange-600 dark:text-orange-400 font-bold">{meal.carbs}g</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-600 dark:text-gray-400">Gordura:</span>
                          <span className="text-orange-600 dark:text-orange-400 font-bold">{meal.fats}g</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Dicas e hidratação */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6 border-2">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-orange-600" />
                    Hidratação
                  </h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">💧</div>
                    <div>
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {dietPlan.waterIntake}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        copos de água por dia
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Beba água regularmente ao longo do dia para manter-se hidratado e auxiliar no metabolismo.
                  </p>
                </Card>

                <Card className="p-6 border-2">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    Dicas Importantes
                  </h4>
                  <ul className="space-y-2">
                    {dietPlan.tips.slice(0, 3).map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Todas as dicas */}
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-2 border-orange-200 dark:border-orange-800">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  Orientações Nutricionais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dietPlan.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Aviso importante */}
              <Card className="p-6 bg-orange-100 dark:bg-orange-950 border-2 border-orange-300 dark:border-orange-700">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      Importante
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Este plano é uma sugestão baseada nos seus dados. Para um acompanhamento personalizado e seguro, 
                      consulte um nutricionista. Ajuste as porções conforme sua fome e necessidades individuais.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
