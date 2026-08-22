import { useAccent } from '@/contexts/AccentContext';
import { useTheme } from '@/contexts/ThemeContext';
import TargetCursor from './TargetCursor';

export const ThemedCursor: React.FC = () => {
  const { currentAccent } = useAccent();
  const { darkMode } = useTheme();

  return (
    <TargetCursor
      spinDuration={3}
      hideDefaultCursor
      parallaxOn
      hoverDuration={0.1}
      cursorColor={darkMode ? '#e2e8f0' : '#1e293b'}
      cursorColorOnTarget={currentAccent}
      targetSelector="a, button, input, textarea, select, [role='button'], .cursor-target, label, summary, [tabindex='0']"
    />
  );
};