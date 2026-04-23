// src/components/Card/Card.styles.ts
import styled from 'styled-components';

export const CardContainer = styled.div<{ $isDragging: boolean; $priorityColor?: string }>`
  background: white;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  cursor: grab;
  transition: all 0.2s ease;
  opacity: ${props => props.$isDragging ? 0.4 : 1};
  border: 1px solid #F8FAFC;
  border-left: 4px solid ${props => props.$priorityColor || '#E2E8F0'};

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    border-color: #E2E8F0;
    transform: translateY(-2px);
  }

  &:active {
    cursor: grabbing;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const CardTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  color: #1E293B;
  line-height: 1.4;
  flex: 1;
  padding-right: 8px;
  letter-spacing: -0.2px;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #64748B;
  margin: 0 0 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
`;

export const CardPriority = styled.div`
  margin-bottom: 2px;
`;

export const PriorityBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${props => props.$color}12;
  color: ${props => props.$color};
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    background: ${props => props.$color};
    border-radius: 50%;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;

  ${CardContainer}:hover & {
    opacity: 1;
  }

  @media (max-width: 390px) {
    opacity: 1;
  }
`;

export const EditButton = styled.button`
  background: transparent;
  border: none;
  color: #94A3B8;
  font-size: 15px;
  padding: 4px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    color: #6366F1;
    background: #EEF2FF;
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #94A3B8;
  font-size: 18px;
  padding: 4px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    color: #EF4444;
    background: #FEF2F2;
  }
`;