// src/components/Column/Column.tsx
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import {
  ColumnWrapper,
  ColumnTitleBar,
  ColumnTitleLeft,
  ColumnTitle,
  ColumnCardCount,
  ColumnTitleActions,
  EditColumnButton,
  DeleteColumnButton,
  ColumnContainer,
  CardsContainer,
  AddCardButton,
} from './Column.styles';
import { ColumnProps } from './Column.types';
import { Card } from '../Card/Card';
import { Modal } from '../Modal/Modal';
import { Input, TextArea } from '../common/Input/Input';
import { useAppDispatch } from '@/store/hooks';
import {
  addCard,
  moveCard,
  deleteColumn,
  updateColumn,
} from '@/store/slices/boardSlice';
import { v4 as uuidv4 } from 'uuid';
import { PRIORITY_OPTIONS } from '@/utils/constants';
import { Priority } from '@/types';
import { PRESET_COLORS } from '../../App';

export const Column: React.FC<ColumnProps> = ({ column }) => {
  const dispatch = useAppDispatch();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [newCardPriority, setNewCardPriority] = useState<Priority | ''>('');

  const [editedTitle, setEditedTitle] = useState(column.title);
  const [editedColor, setEditedColor] = useState(column.color || '#6366F1');

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item: { id: string; columnId: string; index: number }) => {
      // Перемещение между колонками
      if (item.columnId !== column.id) {
        dispatch(
          moveCard({
            fromColumnId: item.columnId,
            toColumnId: column.id,
            cardId: item.id,
          })
        );
      }
      // Перемещение внутри колонки обрабатывается в Card.tsx через reorderCards
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      dispatch(
        addCard({
          columnId: column.id,
          card: {
            id: uuidv4(),
            title: newCardTitle,
            description: newCardDescription,
            priority: newCardPriority || null,
          },
        })
      );
      setNewCardTitle('');
      setNewCardDescription('');
      setNewCardPriority('');
      setIsAddModalOpen(false);
    }
  };

  const handleUpdateColumn = () => {
    if (editedTitle.trim()) {
      dispatch(
        updateColumn({
          id: column.id,
          title: editedTitle,
          color: editedColor,
        })
      );
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteColumn = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту колонку?')) {
      dispatch(deleteColumn(column.id));
    }
  };

  return (
    <ColumnWrapper>
      <ColumnTitleBar $color={column.color}>
        <ColumnTitleLeft>
          <ColumnCardCount>{column.cards.length}</ColumnCardCount>
          <ColumnTitle>{column.title}</ColumnTitle>
        </ColumnTitleLeft>
        <ColumnTitleActions>
          <EditColumnButton onClick={() => setIsEditModalOpen(true)}>
            ✎
          </EditColumnButton>
          <DeleteColumnButton onClick={handleDeleteColumn}>
            ×
          </DeleteColumnButton>
        </ColumnTitleActions>
      </ColumnTitleBar>

      <ColumnContainer ref={drop} $isOver={isOver}>
        <CardsContainer>
          {column.cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              columnId={column.id}
              index={index}
            />
          ))}
        </CardsContainer>

        <AddCardButton
          $color={column.color}
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add task
        </AddCardButton>
      </ColumnContainer>

      {/* Модалка добавления карточки */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Новая задача"
        onConfirm={handleAddCard}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            placeholder="Заголовок задачи"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <TextArea
            placeholder="Описание"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
          />
          <select
            value={newCardPriority}
            onChange={(e) =>
              setNewCardPriority(e.target.value as Priority | '')
            }
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1.5px solid #E2E8F0',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              color: '#1E293B',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            <option value="">Выберите приоритет</option>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </Modal>

      {/* Модалка редактирования колонки */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Настройки колонки"
        onConfirm={handleUpdateColumn}
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
              placeholder="Название колонки"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
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
                  onClick={() => setEditedColor(color)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    border:
                      editedColor === color
                        ? '3px solid #1E293B'
                        : '3px solid #F1F5F9',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: 0,
                    outline: 'none',
                    boxShadow:
                      editedColor === color
                        ? '0 0 0 3px white, 0 0 0 5px #1E293B'
                        : '0 2px 4px rgba(0,0,0,0.08)',
                    transform:
                      editedColor === color ? 'scale(1.15)' : 'scale(1)',
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
                  background: editedColor,
                  border: '2px solid #E2E8F0',
                  flexShrink: 0,
                  transition: 'background 0.2s ease',
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
                  value={editedColor}
                  onChange={(e) => setEditedColor(e.target.value)}
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
    </ColumnWrapper>
  );
};