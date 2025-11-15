"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Apple,
  Infinity
} from "lucide-react";

interface PaywallProps {
  onUpgrade: () => void;
}

export default function Paywall({ onUpgrade }: PaywallProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-2xl border-2 border-orange-300 dark:border-orange-700">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <Crown className="w-10 h-10 text-white" />
          </div>
          
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2">
            🔥 Oferta Especial - Pagamento Único
          </Badge>
          <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">
            Acesso Vitalício ao ForçaDiaria
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Pague uma vez e tenha acesso completo para sempre!
          </p>
        </div>

        {/* Benefícios Premium */}
        <div className="mb-8 space-y-3">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-100">
            ✨ O que você terá com o acesso completo:
          </h3>
          {[
            { icon: Infinity, text: "Acesso vitalício - sem mensalidades!" },
            { icon: Zap, text: "30 dias completos de treinos progressivos" },
            { icon: Apple, text: "Plano de dieta personalizado e detalhado" },
            { icon: Target, text: "Acompanhamento de progresso e estatísticas" },
            { icon: Crown, text: "Todas as atualizações futuras incluídas" }
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Preço */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
          <div className="text-center">
            <div className="text-sm opacity-90 mb-2 line-through">De R$ 97,00 por</div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-6xl font-bold">19,99</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-lg font-semibold bg-white/20 rounded-lg py-2 px-4 backdrop-blur-sm">
              <Infinity className="w-5 h-5" />
              <span>Pagamento Único - Acesso Vitalício</span>
            </div>
            <div className="text-sm opacity-90 mt-3">
              ✨ Sem renovações, sem surpresas - pague uma vez e use para sempre!
            </div>
          </div>
        </Card>

        {/* Botões */}
        <div className="space-y-3">
          <Button
            onClick={onUpgrade}
            size="lg"
            className="w-full text-lg py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Garantir Acesso Vitalício por R$ 19,99
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Garantia */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Garantia de 7 dias - 100% do seu dinheiro de volta</span>
          </div>
        </div>

        {/* Depoimento */}
        <Card className="mt-6 p-4 bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
          <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-2">
            "Melhor investimento que fiz na minha saúde! Por apenas 19,99 tenho acesso completo para sempre. Perdi 8kg em 30 dias e me sinto incrível."
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold">
              M
            </div>
            <div className="text-xs">
              <div className="font-semibold text-gray-800 dark:text-gray-100">Maria Silva</div>
              <div className="text-gray-600 dark:text-gray-400">Usuária Premium</div>
            </div>
          </div>
        </Card>

        {/* Urgência */}
        <div className="mt-6 text-center">
          <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold">
            ⚡ Oferta por tempo limitado - Garanta seu acesso vitalício agora!
          </p>
        </div>
      </Card>
    </div>
  );
}
