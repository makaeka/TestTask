// src/components/Board/Board.tsx
import React from 'react';
import { BoardContainer, ColumnsContainer } from './Board.styles';
import { Column } from '../Column/Column';
import { useAppSelector } from '@/store/hooks';

const Board: React.FC = () => {
  const columns = useAppSelector((state) => state.board.columns);

  return (
    <BoardContainer>
      <ColumnsContainer>
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </ColumnsContainer>
    </BoardContainer>
  );
};

export default Board;