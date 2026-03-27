import React from 'react';
import { X, HelpCircle } from 'lucide-react';

interface HelpModalProps {
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <HelpCircle className="w-6 h-6 text-indigo-600" />
                        使い方ガイド
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-700">
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 border-b pb-2">1. データの読み込み</h3>
                        <p className="text-sm">
                            「社員データ読込」エリアに、所定のフォーマットのExcel (.xlsx) または CSV ファイルをドラッグ＆ドロップしてください。<br/>
                            テンプレートは「テンプレートDL」ボタンからダウンロードできます。
                        </p>
                    </section>
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 border-b pb-2">2. シミュレーション設定</h3>
                        <p className="text-sm">
                            パターンA（変更案）とパターンB（現行制度）のそれぞれについて、定年年齢や評価ポイントなどの設定を行います。<br/>
                            パターンAでは、新制度への統一や調整措置を有効にすることができます。
                        </p>
                    </section>
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 border-b pb-2">3. 結果の確認と出力</h3>
                        <p className="text-sm">
                            設定を変更すると自動的に再計算が行われます。<br/>
                            「比較結果をExcel出力」ボタンをクリックすると、全社員のシミュレーション結果をExcelファイルとしてダウンロードできます。<br/>
                            また、画面下部の「個人別シミュレーション比較」で特定の社員を検索して詳細を確認できます。
                        </p>
                    </section>
                    <section>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 border-b pb-2">4. AIコンサルタント</h3>
                        <p className="text-sm">
                            画面右下のチャットボタンから、AI人事労務コンサルタントに相談することができます。<br/>
                            シミュレーション結果の分析や、制度改定のアドバイスを受けることができます。
                        </p>
                    </section>
                </div>
                <div className="p-6 border-t border-slate-200 flex justify-end">
                    <button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};
