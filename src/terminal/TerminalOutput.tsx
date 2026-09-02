import React, { memo } from 'react';
import type { OutputLine } from './types';
import { Line } from './components/Line';

interface Props {
  lines: OutputLine[];
}

/** Renders the full scrollback history. Memoized on the lines array identity. */
export const TerminalOutput: React.FC<Props> = memo(({ lines }) => (
  <div className="space-y-1">
    {lines.map((line, i) => {
      const key = line.kind === 'block' ? `b-${line.id}` : `i-${i}`;
      return <Line key={key} line={line} />;
    })}
  </div>
));

export default TerminalOutput;
