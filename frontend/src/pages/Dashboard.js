import React, { useState } from 'react';
import PdfUpload from './PdfUpload';
import Analysis from './Analysis';

export default function Dashboard() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleUploadSuccess = () => {
        // Increment trigger to notify Analysis component to refresh
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Dashboard</h1>
                    <p className="text-muted" style={{ fontSize: '1.125rem' }}>Manage your documents and view AI insights.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
                <div className="glass-card" style={{ height: 'fit-content' }}>
                    <PdfUpload onUploadSuccess={handleUploadSuccess} />
                </div>

                <div className="glass-card" style={{ minHeight: '600px' }}>
                    <Analysis key={refreshTrigger} />
                </div>
            </div>
        </div>
    );
}
