// src/components/Board/Board.styles.ts
import styled from 'styled-components';

export const BoardContainer = styled.main`
  flex: 1;
  display: flex;
  overflow-x: auto;
  overflow-y: auto;
  padding: 40px 36px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  justify-content: center;

  &::-webkit-scrollbar { 
    height: 6px; 
    width: 6px;
  }
  &::-webkit-scrollbar-track { 
    background: transparent; 
  }
  &::-webkit-scrollbar-thumb { 
    background: #E2E8F0; 
    border-radius: 10px; 
  }

  @media (max-width: 768px) {
    padding: 28px 20px;
    justify-content: flex-start;
  }

  @media (max-width: 640px) {
    padding: 20px 16px;
    overflow-x: hidden;
    overflow-y: auto;
    justify-content: center;
  }

  @media (max-width: 390px) {
    padding: 16px 12px;
  }
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 28px;
  height: 100%;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 20px;
  }

  // На экранах меньше 640px — колонки вертикально
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
  }

  @media (max-width: 390px) {
    gap: 20px;
  }
`;