import React from 'react';
import { CalculationResult } from '../types';
import { ArrowRightCircle, Calendar, Users } from 'lucide-react';

interface ResultCardProps {
    resA: CalculationResult;
    resB: CalculationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ resA, resB }) => {
    const diff = resA.retirementAllowance - resB.retirementAllowance;
    const diffClass = diff > 0 ? 'text-emerald-600' : diff < 0 ? 'text-red-600' : 'text-slate-600';

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Users className="w-6 h-6 text-indigo-600" />
                        {resB.name} <span className="text-sm font-normal text-slate-500">({resB.employeeId})</span>
                    </h3>
                    <div className="text-sm text-slate-500 mt-1">
                        {resB.typeName} / {resB.grade} / 勤続 {resB.serviceDuration.years}年{resB.serviceDuration.months}ヶ月
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-slate-500">退職予定日</div>
                    <div className="font-bold text-slate-700 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {resB.retirementDate.toLocaleDateString('ja-JP')}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="text-sm font-bold text-slate-500 mb-2">現行制度 (パターンB)</div>
                    <div className="text-2xl font-bold text-slate-800">
                        {Math.round(resB.retirementAllowance).toLocaleString()} <span className="text-sm font-normal">千円</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                        累計ポイント: {Math.round(resB.totalPointsAtRetirement).toLocaleString()} pt
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <ArrowRightCircle className="w-8 h-8 text-slate-300" />
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <div className="text-sm font-bold text-indigo-600 mb-2">変更案 (パターンA)</div>
                    <div className="text-2xl font-bold text-indigo-900">
                        {Math.round(resA.retirementAllowance).toLocaleString()} <span className="text-sm font-normal">千円</span>
                    </div>
                    <div className="text-xs text-indigo-400 mt-1">
                        累計ポイント: {Math.round(resA.totalPointsAtRetirement).toLocaleString()} pt
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="text-sm font-bold text-slate-600">差額 (A - B)</div>
                <div className={`text-xl font-bold ${diffClass}`}>
                    {diff > 0 ? '+' : ''}{Math.round(diff).toLocaleString()} <span className="text-sm font-normal">千円</span>
                </div>
            </div>
        </div>
    );
};
