"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Target,
  TrendingUp,
  Calendar,
  Award,
  CheckCircle2,
  Zap,
  Apple as AppleIcon,
  Clock,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  Smartphone,
  Monitor,
  Download
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2 text-sm">
            🔥 Transforme seu corpo em 30 dias
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            ForçaDiaria
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Treinos personalizados e plano de dieta sob medida para alcançar seus objetivos de forma eficaz
          </p>

          {/* Disponível em múltiplas plataformas */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-semibold">
              Disponível em todas as plataformas:
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Badge variant="outline" className="px-4 py-2 text-base border-2 border-orange-300 dark:border-orange-700">
                <Monitor className="w-4 h-4 mr-2" />
                Web
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-base border-2 border-orange-300 dark:border-orange-700">
                <AppleIcon className="w-4 h-4 mr-2" />
                App Store
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-base border-2 border-orange-300 dark:border-orange-700">
                <Smartphone className="w-4 h-4 mr-2" />
                Google Play
              </Badge>
            </div>
          </div>

          {/* Preço em destaque */}
          <Card className="max-w-md mx-auto mb-8 p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-2xl">
            <div className="text-center">
              <div className="text-sm opacity-90 mb-2">Acesso Completo</div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl font-bold">R$ 47</span>
                <span className="text-xl opacity-90">/mês</span>
              </div>
              <div className="text-sm opacity-90 mb-4">ou R$ 397/ano (economize 30%)</div>
              <Badge className="bg-white/20 text-white border-0 px-3 py-1">
                ✨ Garantia de 7 dias ou seu dinheiro de volta
              </Badge>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Começar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            🔒 Pagamento seguro • Cancele quando quiser
          </p>
        </div>

        {/* Badges das Lojas */}
        <div className="mb-20">
          <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
            Baixe agora nas lojas oficiais:
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#"
              className="inline-block hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-2xl">
                <AppleIcon className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs">Baixar na</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="inline-block hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-2xl">
                <Download className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs">Disponível no</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Preview do App */}
        <div className="mb-20">
          <Card className="p-8 shadow-2xl border-2 border-orange-200 dark:border-orange-800">
            <img 
              src="https://bolt-chat-assets.production.threepointone.dev/c_1737496896818_-1_image.png" 
              alt="ForçaDiaria Preview" 
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </Card>
        </div>

        {/* Benefícios */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
            Por que escolher o ForçaDiaria?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-400">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                100% Personalizado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Treinos e dieta adaptados aos seus objetivos, restrições alimentares e nível de condicionamento
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-400">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                Plano de 30 Dias
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Programa completo e progressivo que evolui com você, do iniciante ao avançado
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-400">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <AppleIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                Nutrição Completa
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Plano alimentar detalhado com todas as refeições e macronutrientes calculados
              </p>
            </Card>
          </div>
        </div>

        {/* Recursos */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
            Tudo que você precisa em um só lugar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: "Treinos Progressivos", desc: "30 dias de treinos que evoluem com você" },
              { icon: AppleIcon, title: "Plano de Dieta Personalizado", desc: "Refeições adaptadas aos seus objetivos" },
              { icon: Flame, title: "Contador de Calorias", desc: "Acompanhe calorias queimadas em tempo real" },
              { icon: TrendingUp, title: "Progresso Visual", desc: "Veja sua evolução dia após dia" },
              { icon: Clock, title: "Treinos Rápidos", desc: "15-30 minutos por dia, sem equipamento" },
              { icon: Award, title: "Sistema de Conquistas", desc: "Mantenha-se motivado com recompensas" }
            ].map((feature, index) => (
              <Card key={index} className="p-6 flex items-start gap-4 hover:shadow-lg transition-all duration-300 border-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Planos e Preços */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
            Escolha seu plano
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Acesso completo a todos os recursos, treinos e planos de dieta personalizados
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Mensal */}
            <Card className="p-8 border-2 border-gray-300 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Mensal</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold text-orange-600">R$ 47</span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Flexibilidade total, cancele quando quiser
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Acesso completo aos treinos",
                  "Plano de dieta personalizado",
                  "Acompanhamento de progresso",
                  "Suporte prioritário",
                  "Atualizações mensais"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={onGetStarted}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Começar Agora
              </Button>
            </Card>

            {/* Plano Anual - Destaque */}
            <Card className="p-8 border-2 border-orange-500 dark:border-orange-600 hover:shadow-2xl transition-all duration-300 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-1">
                💎 MELHOR VALOR
              </Badge>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Anual</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-orange-600">R$ 397</span>
                  <span className="text-gray-600 dark:text-gray-400">/ano</span>
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0 mb-2">
                  Economize R$ 167 (30%)
                </Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Equivalente a R$ 33/mês
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Acesso completo aos treinos",
                  "Plano de dieta personalizado",
                  "Acompanhamento de progresso",
                  "Suporte prioritário VIP",
                  "Atualizações mensais",
                  "Conteúdo exclusivo premium",
                  "Desconto de 30% garantido"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={onGetStarted}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Começar Agora
              </Button>
            </Card>
          </div>
        </div>

        {/* Depoimentos */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
            O que nossos usuários dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria Silva",
                role: "Perdeu 8kg em 30 dias",
                text: "Incrível! Nunca pensei que conseguiria me exercitar em casa. O plano de dieta foi essencial!",
                rating: 5
              },
              {
                name: "João Santos",
                role: "Ganhou 3kg de massa",
                text: "Os treinos são desafiadores mas eficazes. Já vejo resultados e estou mais motivado que nunca!",
                rating: 5
              },
              {
                name: "Ana Costa",
                role: "Manteve o peso ideal",
                text: "Perfeito para manter a forma! Os treinos são rápidos e cabem na minha rotina corrida.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mb-20">
          <Card className="p-12 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 mr-2" />
                  <div className="text-5xl font-bold">10k+</div>
                </div>
                <div className="text-orange-100">Usuários Ativos</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Flame className="w-8 h-8 mr-2" />
                  <div className="text-5xl font-bold">2M+</div>
                </div>
                <div className="text-orange-100">Calorias Queimadas</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-8 h-8 mr-2" />
                  <div className="text-5xl font-bold">95%</div>
                </div>
                <div className="text-orange-100">Taxa de Satisfação</div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-2 border-orange-300 dark:border-orange-700">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Pronto para transformar seu corpo?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já alcançaram seus objetivos com o ForçaDiaria
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="text-xl px-12 py-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Começar Agora
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              🔒 Pagamento seguro • Garantia de 7 dias • Cancele quando quiser
            </p>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "Preciso de equipamentos?",
                a: "Não! Todos os treinos são feitos com o peso do corpo, sem necessidade de equipamentos."
              },
              {
                q: "Quanto tempo duram os treinos?",
                a: "Entre 15 e 30 minutos por dia, perfeito para encaixar na sua rotina."
              },
              {
                q: "O plano de dieta é flexível?",
                a: "Sim! Personalizamos baseado em suas restrições alimentares e preferências."
              },
              {
                q: "Funciona para iniciantes?",
                a: "Com certeza! O programa é progressivo e se adapta ao seu nível de condicionamento."
              },
              {
                q: "Posso cancelar a qualquer momento?",
                a: "Sim! Você pode cancelar sua assinatura quando quiser, sem taxas ou multas."
              },
              {
                q: "Como funciona a garantia?",
                a: "Se não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 border-2">
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 ml-7">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
