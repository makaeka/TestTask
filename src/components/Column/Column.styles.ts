// src/components/Column/Column.styles.ts
import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  @media (max-width: 640px) {
    width: 100%;
    max-width: 400px;
  }
`;

export const ColumnTitleBar = styled.div<{ $color?: string }>`
  background: ${props => props.$color || '#6366F1'};
  color: white;
  padding: 20px 24px;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const ColumnTitleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ColumnCardCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  backdrop-filter: blur(5px);
`;

export const ColumnTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: -0.3px;
`;

export const ColumnTitleActions = styled.div`
  display: flex;
  gap: 6px;
`;

export const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.2s;
  cursor: pointer;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: scale(1.05);
  }
`;

export const EditColumnButton = styled(IconButton)``;

export const DeleteColumnButton = styled(IconButton)`
  &:hover {
    background: rgba(239, 68, 68, 0.5);
  }
`;

export const ColumnContainer = styled.div<{ $isOver: boolean }>`
  background: white;
  border-radius: 0 0 20px 20px;
  width: 360px;
  min-width: 360px;
  max-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #F1F5F9;
  border-top: none;
  transition: all 0.2s ease;

  ${props => props.$isOver && `
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.3);
  `}

  @media (max-width: 768px) {
    width: 340px;
    min-width: 340px;
    max-height: calc(100vh - 170px);
  }

  // На мобильных — на всю ширину, без фиксированной высоты
  @media (max-width: 640px) {
    width: 100%;
    min-width: unset;
    max-height: none;
    height: auto;
    min-height: 200px;
    max-height: 500px;
  }

  @media (max-width: 390px) {
    max-height: 450px;
  }
`;

export const CardsContainer = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;

  &::-webkit-scrollbar { 
    width: 4px; 
  }
  &::-webkit-scrollbar-track { 
    background: transparent; 
    margin: 10px 0; 
  }
  &::-webkit-scrollbar-thumb { 
    background: #E2E8F0; 
    border-radius: 10px; 
  }

  @media (max-width: 640px) {
    max-height: 350px;
  }
`;

export const AddCardButton = styled.button<{ $color?: string }>`
  margin: 6px 16px 20px;
  padding: 14px 20px;
  background: transparent;
  border: 2px dashed #E2E8F0;
  color: #94A3B8;
  border-radius: 14px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.2px;

  &:hover {
    border-color: ${props => props.$color || '#6366F1'};
    color: ${props => props.$color || '#6366F1'};
    background: ${props => props.$color || '#6366F1'}06;
    transform: translateY(-1px);
  }

  @media (max-width: 390px) {
    padding: 14px;
    font-size: 15px;
  }
`;