// src/components/common/Input/Input.styles.ts
import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s;
  -webkit-appearance: none;
  outline: none;
  background: white;
  color: #1E293B;

  &::placeholder {
    color: #94A3B8;
  }
  
  &:focus {
    border-color: #6366F1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    font-size: 16px;
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  resize: vertical;
  min-height: 80px;
  -webkit-appearance: none;
  outline: none;
  color: #1E293B;

  &::placeholder {
    color: #94A3B8;
  }
  
  &:focus {
    border-color: #6366F1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    font-size: 16px;
  }
`;