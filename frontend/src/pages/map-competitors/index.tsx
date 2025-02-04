import React, { Suspense } from 'react';
import Spinner from '../../components/ui/spinner';

import { CompetitorsTable } from "../../components/competitors/competitors-table";
const CompetitorsMap = React.lazy(() => import('./../../components/competitors/competitors-map'))

const Map = () => {
    return (
        <>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">Direct Competitors Map</h1>
            </div>
            
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
                <CompetitorsMap />
            </Suspense>

            <CompetitorsTable />
        </>
    );
};

export default Map;