import React, { useState } from 'react';
import { AggregatedYearlyData } from '../types';
import { Bot, Loader2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

interface AIAnalysisReportProps {
    data: AggregatedYearlyData[];
}

export const AIAnalysisReport: React.FC<AIAnalysisReportProps> = ({ data }) => {
    const [report, setReport] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateReport = async () => {
        if (!data || data.length === 0) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
            const ai = new GoogleGenAI({ apiKey: apiKey });
            
            const totalCostA = data.reduce((sum, d) => sum + d.A.total, 0);
            const totalCostB = data.reduce((sum, d) => sum + d.B.total, 0);
            
            const prompt = `
以下の退職金シミュレーション結果（現行制度Bと変更案Aの比較）を分析し、経営者向けにレポートを作成してください。

【データ概要】
- 対象期間: ${data[0]?.year}年 ～ ${data[data.length - 1]?.year}年
- 現行制度(B)の総費用: ${Math.round(totalCostB).toLocaleString()} 千円
- 変更案(A)の総費用: ${Math.round(totalCostA).toLocaleString()} 千円
- 差額(A - B): ${Math.round(totalCostA - totalCostB).toLocaleString()} 千円

レポートには以下の内容を含めてください：
1. 全体的なコストインパクトの要約
2. 長期的な推移の傾向
3. 制度変更によるメリット・デメリットの考察
4. 今後の検討課題

Markdown形式で見出しや箇条書きを使って分かりやすく記述してください。
`;

            const response = await ai.models.generateContent({
                model: 'gemini-3.1-pro-preview',
                contents: prompt,
            });
            
            setReport(response.text || 'レポートを生成できませんでした。');
        } catch (err: any) {
            console.error("AI Analysis Error:", err);
            setError(err.message || 'レポートの生成中にエラーが発生しました。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Bot className="w-6 h-6 text-indigo-600" />
                    AI 分析レポート
                </h3>
                <button
                    onClick={generateReport}
                    disabled={isLoading || data.length === 0}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                    {report ? '再生成' : 'レポートを生成'}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {report ? (
                <div className="markdown-body prose prose-slate max-w-none">
                    <Markdown>{report}</Markdown>
                </div>
            ) : !isLoading && !error ? (
                <div className="text-center py-12 text-slate-500">
                    <Bot className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p>上のボタンをクリックして、AIによるシミュレーション結果の分析レポートを生成します。</p>
                </div>
            ) : null}
            
            {isLoading && (
                <div className="text-center py-12 text-slate-500">
                    <Loader2 className="w-12 h-12 mx-auto text-indigo-400 animate-spin mb-3" />
                    <p>AIがデータを分析し、レポートを作成しています...</p>
                </div>
            )}
        </div>
    );
};
