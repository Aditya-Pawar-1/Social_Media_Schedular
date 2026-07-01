import { CheckCircleIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

interface PlatformPickerModelProps {
  connectedIds: string[];
  connecting: string | null;
  onConnect: (platformId: string) => void;
  onClose: () => void;
}

const PlatformPickerModel = ({
  connectedIds,
  connecting,
  onConnect,
  onClose,
}: PlatformPickerModelProps) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur h-full   p-4 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shadow">
          <h3 className="text-slate-700">Choose a Platform</h3>
          <button
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={onClose}
          >
            <XIcon className="size-4" />
          </button>
        </div>

        {/* Platform List */}
        <div className="p-6 flex flex-col gap-2">
          {PLATFORMS.map((p) => {
            const isConnected = connectedIds.includes(p.id);
            const isConnecting = connecting === p.id;
            return (
              <button
                key={p.id}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all 
                ${isConnected ? "bg-blue-50 border-blue-200 cursor-default" : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 cursor-pointer"}
                ${isConnecting && "opacity-60"}`}
                disabled={isConnected || isConnecting}
                onClick={() => !isConnected && !isConnecting && onConnect(p.id)}
              >
                {/* Icon */}
                <div className="p-2">
                  <p.icon
                    className={`size-5 ${isConnected ? "text-blue-600" : "text-slate-500"}`}
                  />
                </div>

                {/* Label */}
                <div>
                  <div
                    className={`text-sm ${isConnected ? "text-blue-700" : "text-slate-800"}`}
                  >
                    {p.name}
                  </div>

                  <div className="text-xs text-slate-500 truncate">
                    {isConnected ? "Already Connected" : p.description}
                  </div>
                </div>

                {/* Status */}
                {isConnected && (
                  <CheckCircleIcon className="size-4 text-blue-500 shrink-0" />
                )}
                {isConnecting && (
                  <div className="size-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
                )}
                {!isConnected && !isConnecting && (
                  <ExternalLinkIcon className="size-3.5 text-slate-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlatformPickerModel;
