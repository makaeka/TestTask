// src/App.styles.ts
import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
`;

export const Header = styled.header`
  padding: 20px 40px;
  background: #F8FAFC;
  border-bottom: 1px solid #F1F5F9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 16px 24px;
  }

  @media (max-width: 390px) {
    padding: 14px 16px;
  }
`;

export const Logo = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #1E293B;
  margin: 0;
  letter-spacing: -1px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 390px) {
    font-size: 20px;
  }
`;

export const AddColumnButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  color: #94A3B8;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #E2E8F0;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366F1;
    color: #6366F1;
    background: rgba(99, 102, 241, 0.04);
  }

  &:active {
    transform: scale(0.95);
  }
`;