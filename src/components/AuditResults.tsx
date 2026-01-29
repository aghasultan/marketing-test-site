import React from 'react';
import { motion } from 'framer-motion';
import { AuditResult } from '../services/auditService';

interface AuditResultsProps {
    result: AuditResult;
}

export const AuditResults: React.FC<AuditResultsProps> = ({ result }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const getScoreColor = (grade: string) => {
        switch (grade) {
            case 'A': return 'text-emerald-500';
            case 'B': return 'text-emerald-400';
            case 'C': return 'text-yellow-500';
            case 'D': return 'text-orange-500';
            case 'F': return 'text-red-500';
            default: return 'text-slate-400';
        }
    };

    return (
        <motion.div
            className="bento-grid mt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Score Card */}
            <motion.div className="bento-item bento-span-2 flex items-center justify-between" variants={itemVariants}>
                <div>
                    <h3 className="bento-title">Audit Score</h3>
                    <p className="text-slate-400">Based on heuristics analysis</p>
                </div>
                <div className="text-right">
                    <div className={`text-6xl font-bold ${getScoreColor(result.grade)}`}>{result.score}</div>
                    <div className={`text-2xl font-bold ${getScoreColor(result.grade)}`}>Grade: {result.grade}</div>
                </div>
            </motion.div>

            {/* Analysis Grid */}
            <motion.div className="bento-item" variants={itemVariants}>
                <h4 className="font-bold mb-2 text-white">Headlines</h4>
                <p className="text-sm text-slate-400">{result.analysis.headlines}</p>
            </motion.div>

            <motion.div className="bento-item" variants={itemVariants}>
                <h4 className="font-bold mb-2 text-white">Descriptions</h4>
                <p className="text-sm text-slate-400">{result.analysis.descriptions}</p>
            </motion.div>

            <motion.div className="bento-item" variants={itemVariants}>
                <h4 className="font-bold mb-2 text-white">Keywords</h4>
                <p className="text-sm text-slate-400">{result.analysis.keywords}</p>
            </motion.div>

            {/* Recommendations */}
            <motion.div className="bento-item bento-span-2" variants={itemVariants}>
                <h3 className="bento-title mb-4">Recommendations</h3>
                <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                            <span className="text-emerald-500 mt-1">✓</span>
                            {rec}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};
