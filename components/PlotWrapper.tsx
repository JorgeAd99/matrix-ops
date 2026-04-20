'use client';
import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function PlotWrapper({ data, layout, config }: { data: any, layout: any, config: any }) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current || !data) return;
    
    // newPlot or react. Plotly.react is the idiomatic way to update
    // a plot efficiently without destroying and recreating the DOM.
    Plotly.react(divRef.current, data, layout, config);
    
    // We only purge on unmount
    return () => {
      // It is safer to NOT purge synchronously during React's render phase
      // if not strictly necessary, but purge cleans up event listeners.
    };
  }, [data, layout, config]);

  useEffect(() => {
    return () => {
      if (divRef.current) {
        Plotly.purge(divRef.current);
      }
    };
  }, []);

  return <div ref={divRef} style={{ width: '100%', height: '100%' }} />;
}
