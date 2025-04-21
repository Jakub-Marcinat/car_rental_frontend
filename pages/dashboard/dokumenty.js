import Image from "next/image";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Info,
} from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";

export default function Documents() {
  const [documents, setDocuments] = useState({
    licenseFront: null,
    licenseBack: null,
    idFront: null,
    idBack: null,
  });

  const [uploading, setUploading] = useState({
    licenseFront: false,
    licenseBack: false,
    idFront: false,
    idBack: false,
  });

  const fileInputRefs = {
    licenseFront: useRef(null),
    licenseBack: useRef(null),
    idFront: useRef(null),
    idBack: useRef(null),
  };

  const handleDocumentUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [type]: true }));

    const data = new FormData();
    data.append("file", file);
    data.append("category", `documents/${type}`);

    try {
      const res = await fetch("/api/user/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.links?.[0]) {
        const uploadedUrl = result.links[0];

        setDocuments((prev) => ({ ...prev, [type]: uploadedUrl }));

        await fetch("/api/user/documents/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, url: uploadedUrl }),
        });
      }
    } catch (error) {
      console.error("Chyba pri nahrávaní, skúste to znovu:", error);
    }

    setUploading((prev) => ({ ...prev, [type]: false }));
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      const res = await fetch("/api/user/documents");
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);
      }
    };

    fetchDocuments();
  }, []);

  const renderUploadSlot = (type, label) => {
    const inputRef = fileInputRefs[type];

    return (
      <div className="relative border-2 border-dashed border-zinc-700 rounded-xl p-4 bg-zinc-800/30">
        {documents[type] ? (
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
            <Image
              src={documents[type]}
              alt={label}
              width={450}
              height={300}
              className="object-cover"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleDocumentUpload(e, type)}
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-zinc-800/80 flex items-center justify-center mb-4">
              {uploading[type] ? (
                <RefreshCw className="w-6 h-6 text-yellow-400 animate-spin" />
              ) : (
                <Upload className="w-8 h-8 text-zinc-500" />
              )}
            </div>
            <p className="text-white font-medium mb-1">{label}</p>
            <p className="text-sm text-zinc-500 mb-4 text-center max-w-xs">
              Podporované formáty: JPG, PNG, PDF. Max. veľkosť: 5MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleDocumentUpload(e, type)}
              className="hidden"
            />
            <button
              type="button"
              disabled={uploading[type]}
              onClick={() => inputRef.current?.click()}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {uploading[type] ? "Nahráva sa..." : "Nahrať súbor"}
            </button>
          </div>
        )}
      </div>
    );
  };

  const getStatusBadge = (status) => {
    if (status === "verified") {
      return (
        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
          Overené
        </span>
      );
    }
    if (status === "rejected") {
      return (
        <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full">
          Zamietnuté
        </span>
      );
    }
    return (
      <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
        Čaká na overenie
      </span>
    );
  };

  return (
    <div>
      <Header />
      <DashboardLayout title="Dokumenty">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              Dokumenty
            </h2>
            <p className="text-zinc-400">
              Nahrajte a spravujte svoje doklady potrebné pre prenájom vozidiel
            </p>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden mb-8">
            <div className="p-6 md:p-8 border-b border-zinc-800/50">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-corklasYellow" />
                <h3 className="text-lg font-medium text-white">
                  Prečo potrebujeme vaše doklady?
                </h3>
              </div>
              <p className="text-zinc-400 mt-2">
                Pre prenájom vozidla potrebujeme overiť vašu totožnosť a
                vodičské oprávnenie. Všetky dokumenty sú bezpečne uložené a
                používané výhradne na účely overenia. Dokumenty musia byť
                čitateľné a nesmú byť po dátume platnosti.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-zinc-800/50">
                <h3 className="text-xl font-display font-bold text-white">
                  Vodičský preukaz
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Nahrajte prednú a zadnú stranu vášho vodičského preukazu
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Predná strana</h4>
                    {getStatusBadge(documents?.licenseFrontStatus)}
                  </div>

                  {renderUploadSlot(
                    "licenseFront",
                    "Nahrajte prednú stranu vodičského preukazu"
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Zadná strana</h4>
                    {getStatusBadge(documents?.licenseBackStatus)}
                  </div>

                  {renderUploadSlot(
                    "licenseBack",
                    "Nahrajte zadnú stranu vodičského preukazu"
                  )}
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-zinc-800/50">
                <h3 className="text-xl font-display font-bold text-white">
                  Občiansky preukaz
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Nahrajte prednú a zadnú stranu vášho občianskeho preukazu
                </p>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Predná strana</h4>
                    {getStatusBadge(documents?.idFrontStatus)}
                  </div>

                  {renderUploadSlot(
                    "idFront",
                    "Nahrajte prednú stranu občianskeho preukazu"
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Zadná strana</h4>
                    {getStatusBadge(documents?.idBackStatus)}
                  </div>

                  {renderUploadSlot(
                    "idBack",
                    "Nahrajte zadnú stranu občianskeho preukazu"
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-zinc-900/70 backdrop-blur-md rounded-3xl border border-zinc-800/50 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-zinc-800/50">
              <h3 className="text-xl font-display font-bold text-white">
                Pokyny pre nahrávanie dokumentov
              </h3>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-800/50 rounded-xl p-5">
                  <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Čitateľnosť</h4>
                  <p className="text-zinc-400 text-sm">
                    Uistite sa, že všetky informácie na dokumente sú jasne
                    čitateľné a nie sú rozmazané.
                  </p>
                </div>

                <div className="bg-zinc-800/50 rounded-xl p-5">
                  <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Platnosť</h4>
                  <p className="text-zinc-400 text-sm">
                    Dokumenty musia byť platné a nesmú byť po dátume expirácie
                    uvedenom na dokumente.
                  </p>
                </div>

                <div className="bg-zinc-800/50 rounded-xl p-5">
                  <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Kompletnosť</h4>
                  <p className="text-zinc-400 text-sm">
                    Nahrajte obe strany dokumentov. Všetky okraje a rohy musia
                    byť viditeľné.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
