import React from 'react';
import { SimulationConfig } from '../types';
import { X } from 'lucide-react';

interface MasterEditorModalProps {
    pattern: 'A' | 'B';
    config: SimulationConfig;
    setConfig: React.Dispatch<React.SetStateAction<SimulationConfig>>;
    onClose: () => void;
}

export const MasterEditorModal: React.FC<MasterEditorModalProps> = ({ pattern, config, setConfig, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">
                        マスタ編集 - パターン{pattern}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    <p className="text-slate-600 mb-4">
                        ※ ここではマスタデータ（ポイント表や係数表）の編集機能を提供します。
                        （現在はプレースホルダーとして表示しています。必要に応じてスプレッドシート形式のUIを実装してください。）
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm font-mono overflow-auto max-h-96">
                        <pre>{JSON.stringify(config.masterData2, null, 2)}</pre>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-200 flex justify-end">
                    <button onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-2 rounded-lg font-bold transition-colors">
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};
