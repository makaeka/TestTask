// src/styles/theme.ts
export const theme = {
  colors: {
    background: '#FFFFFF', // Белый фон body
    surface: '#FFFFFF',
    textMain: '#1E293B',
    textSecondary: '#64748B',
    accent: '#6366F1',
    accentHover: '#4F46E5',
    accentLight: '#EEF2FF',
    border: '#E2E8F0',
    ghost: '#F8FAFC',
    danger: '#EF4444',
    dangerHover: '#DC2626',
    success: '#10B981',
    warning: '#F59E0B',
    
    // Header
    headerBg: '#F8FAFC', // Светло-серый, чуть темнее белого
    
    // Колонки
    columnTodo: '#6366F1',
    columnInProgress: '#F59E0B',
    columnDone: '#10B981',
    
    // Приоритеты
    priorityLow: '#10B981',
    priorityMedium: '#F59E0B',
    priorityHigh: '#EF4444',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0 4px 12px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
    xl: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
  },
  radius: {
    sm: '10px',
    md: '16px',
    lg: '24px',
    full: '9999px',
  },
  breakpoints: {
    sm: '390px',
    md: '768px',
    lg: '1024px',
  },
};