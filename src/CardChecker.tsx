import React, { useState } from "react";
import { Lock } from "lucide-react";

export default function CreditCardChecker() {
  const [formData, setFormData] = useState({
    nome: "",
    numero: "",
    mes: "",
    ano: "",
    cvv: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [, setIsValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "numero") {
      const numeros = value.replace(/\D/g, "").slice(0, 16);
      setFormData((prev) => ({
        ...prev,
        [name]: numeros,
      }));
    } else if (name === "mes") {
      const mes = value.replace(/\D/g, "").slice(0, 2);
      const mesNum = parseInt(mes);
      if (mes === "" || (mesNum >= 1 && mesNum <= 12)) {
        setFormData((prev) => ({
          ...prev,
          [name]: mes,
        }));
      }
    } else if (name === "ano") {
      const ano = value.replace(/\D/g, "").slice(0, 2);
      setFormData((prev) => ({
        ...prev,
        [name]: ano,
      }));
    } else if (name === "cvv") {
      const cvv = value.replace(/\D/g, "").slice(0, 3);
      setFormData((prev) => ({
        ...prev,
        [name]: cvv,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validarCartao = () => {
    const { nome, numero, mes, ano, cvv } = formData;

    if (!nome || !numero || !mes || !ano || !cvv) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    if (numero.length !== 16) {
      alert("Número do cartão deve ter 16 dígitos");
      return;
    }

    if (mes.length !== 2 || ano.length !== 2) {
      alert("Validade inválida");
      return;
    }

    if (cvv.length !== 3) {
      alert("CVV deve ter 3 dígitos");
      return;
    }

    setIsValid(true);
    setShowModal(true);
  };

  const formatarNumero = (valor: string): string => {
    return valor.replace(/(\d{4})/g, "$1 ").trim();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Cartões */}
          <div className="space-y-6 flex flex-col items-center">
            {/* Cartão Frente */}
            <div className="w-full max-w-xs h-56 bg-linear-to-br from-purple-500 to-blue-800 rounded-2xl shadow-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white opacity-10 rounded-full"></div>

              <div className="relative z-10">
                <Lock size={32} className="opacity-60" />
              </div>

              <div className="relative z-10">
                <p className="text-xs opacity-70 tracking-widest mb-2">
                  NÚMERO DO CARTÃO
                </p>
                <p className="text-2xl tracking-widest font-light">
                  {formData.numero
                    ? formatarNumero(formData.numero.padEnd(16, "•"))
                    : "•••• •••• •••• ••••"}
                </p>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-70 mb-1">TITULAR</p>
                  <p className="text-lg font-medium tracking-wide uppercase">
                    {formData.nome || "SEU NOME"}
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">VÁLIDO ATÉ</p>
                  <p className="text-xl font-light">
                    {formData.mes ? formData.mes : "••"}/
                    {formData.ano ? formData.ano : "••"}
                  </p>
                </div>
              </div>
            </div>

            {/* Cartão Verso */}
            <div className="w-full max-w-xs h-56 bg-linear-to-br from-slate-600 to-slate-900 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-8 w-full h-12 bg-black opacity-20"></div>

              <div className="mt-16 flex flex-col items-end">
                <div className="w-full bg-white opacity-80 py-2 px-3 rounded mb-4">
                  <p className="text-black text-sm font-medium tracking-widest text-right">
                    {formData.cvv || "•••"}
                  </p>
                </div>
                <p className="text-white text-xs opacity-60">CVV</p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Verificar Cartão
            </h2>

            <div className="space-y-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="João Silva"
                  maxLength={30}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition uppercase"
                />
              </div>

              {/* Número do Cartão */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength={16}
                  inputMode="numeric"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition tracking-widest text-lg"
                />
                <p className="text-xs text-slate-500 mt-1">
                  {formData.numero.length}/16 dígitos
                </p>
              </div>

              {/* Validade e CVV */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mês
                  </label>
                  <input
                    type="text"
                    name="mes"
                    value={formData.mes}
                    onChange={handleInputChange}
                    placeholder="MM"
                    maxLength={2}
                    inputMode="numeric"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-center text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ano
                  </label>
                  <input
                    type="text"
                    name="ano"
                    value={formData.ano}
                    onChange={handleInputChange}
                    placeholder="AA"
                    maxLength={2}
                    inputMode="numeric"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-center text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="•••"
                    maxLength={3}
                    inputMode="numeric"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-center text-lg"
                  />
                </div>
              </div>

              {/* Botão */}
              <button
                onClick={validarCartao}
                className="w-full bg-linear-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition duration-200 mt-8"
              >
                Checar
              </button>
            </div>
          </div>
        </div>
        <p className="mt-3 text-blue-200">
          Obs: este projeto tem somente tom satírico.
          <br /> Os dados <strong>não são</strong> armazenados e{" "}
          <strong>não são</strong> utilizados para qualquer outro fim.
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Cartão Verificado! ✓
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Parabéns! Seu cartão não foi clonado até então. Os dados estão
              corretos e prontos para uso. 🎉 YEY! 🎊
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
