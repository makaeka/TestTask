// src/App.tsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { AppContainer, Header, Logo, AddColumnButton } from './App.styles';
import Board from './components/Board/Board';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Modal } from './components/Modal/Modal';
import { Input } from './components/common/Input/Input';
import { useAppDispatch } from '@/store/hooks';
import { addColumn } from '@/store/slices/boardSlice';

export const PRESET_COLORS = [
  '#6366F1',
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
  '#8B5CF6',
  '#14B8A6',
  '#F97316',
  '#06B6D4',
  '#84CC16',
  '#64748B',
];

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const dndBackend = isTouchDevice ? TouchBackend : HTML5Backend;

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = React.useState(false);
  const [newColumnTitle, setNewColumnTitle] = React.useState('');
  const [newColumnColor, setNewColumnColor] = React.useState('#6366F1');

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      dispatch(
        addColumn({
          title: newColumnTitle,
          color: newColumnColor,
        })
      );
      setNewColumnTitle('');
      setNewColumnColor('#6366F1');
      setIsAddColumnModalOpen(false);
    }
  };

  return (
    <AppContainer>
      <Header>
        <Logo>Kanban Dashboard</Logo>
        <AddColumnButton
          onClick={() => setIsAddColumnModalOpen(true)}
          title="Добавить колонку"
        >
          +
        </AddColumnButton>
      </Header>
      <Board />

      <Modal
        isOpen={isAddColumnModalOpen}
        onClose={() => setIsAddColumnModalOpen(false)}
        title="Новая колонка"
        onConfirm={handleAddColumn}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#1E293B',
                fontSize: '14px',
              }}
            >
              Название колонки
            </label>
            <Input
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Введите название"
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '12px',
                fontWeight: 600,
                color: '#1E293B',
                fontSize: '14px',
              }}
            >
              Цвет колонки
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewColumnColor(color)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    border:
                      newColumnColor === color
                        ? '3px solid #1E293B'
                        : '3px solid #F1F5F9',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: 0,
                    outline: 'none',
                    boxShadow:
                      newColumnColor === color
                        ? '0 0 0 3px white, 0 0 0 5px #1E293B'
                        : '0 2px 4px rgba(0,0,0,0.08)',
                    transform: newColumnColor === color ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            {/* Свой цвет через палитру */}
            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                background: '#F8FAFC',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: newColumnColor,
                  border: '2px solid #E2E8F0',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#64748B',
                    marginBottom: '4px',
                    fontWeight: 500,
                  }}
                >
                  Свой цвет
                </div>
                <input
                  type="color"
                  value={newColumnColor}
                  onChange={(e) => setNewColumnColor(e.target.value)}
                  style={{
                    width: '100%',
                    height: '32px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    padding: '0',
                    background: 'transparent',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </AppContainer>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <DndProvider backend={dndBackend}>
            <AppContent />
          </DndProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;