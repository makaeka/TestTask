// src/components/Card/Card.tsx
import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  CardContainer,
  CardHeader,
  CardTitle,
  CardDescription,
  CardPriority,
  CardActions,
  EditButton,
  DeleteButton,
  PriorityBadge,
} from './Card.styles';
import { CardProps } from './Card.types';
import { Modal } from '../Modal/Modal';
import { Input, TextArea } from '../common/Input/Input';
import { PRIORITY_OPTIONS, PRIORITY_COLORS } from '@/utils/constants';
import { useAppDispatch } from '@/store/hooks';
import { updateCard, deleteCard, moveCard, reorderCards } from '@/store/slices/boardSlice';
import { Priority } from '@/types';

interface DragItem {
  id: string;
  columnId: string;
  index: number;
  type: string;
}

export const Card: React.FC<CardProps> = ({ card, columnId, index }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [editedDescription, setEditedDescription] = useState(card.description || '');
  const [editedPriority, setEditedPriority] = useState<Priority | ''>(card.priority || '');

  // Drop для перетаскивания внутри колонки
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Не делаем ничего, если элемент на том же месте
      if (dragIndex === hoverIndex) {
        return;
      }

      // Если колонки разные — не обрабатываем здесь (это для moveCard)
      if (item.columnId !== columnId) {
        return;
      }

      // Определяем положение мыши относительно карточки
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Перетаскиваем только когда мышь пересекает середину карточки
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Меняем порядок
      dispatch(reorderCards({
        columnId,
        fromIndex: dragIndex,
        toIndex: hoverIndex,
      }));

      // Обновляем индекс в item
      item.index = hoverIndex;
    },
  });

  // Drag
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: () => {
      return { id: card.id, columnId, index, type: 'CARD' };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // Если перетащили в другую колонку — сработает drop в Column.tsx
    },
  });

  // Объединяем ref для drag и drop
  drag(drop(ref));

  const handleUpdate = () => {
    if (editedTitle.trim()) {
      dispatch(
        updateCard({
          columnId,
          cardId: card.id,
          updates: {
            title: editedTitle,
            description: editedDescription,
            priority: editedPriority || null,
          },
        })
      );
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      dispatch(deleteCard({ columnId, cardId: card.id }));
    }
  };

  return (
    <>
      <CardContainer
        ref={ref}
        $isDragging={isDragging}
        $priorityColor={card.priority ? PRIORITY_COLORS[card.priority] : undefined}
        style={{
          opacity: isDragging ? 0.4 : 1,
          borderTop: isOver && !isDragging ? '2px solid #6366F1' : undefined,
        }}
      >
        <CardHeader>
          <CardTitle>{card.title}</CardTitle>
          <CardActions>
            <EditButton onClick={() => setIsEditModalOpen(true)}>✎</EditButton>
            <DeleteButton onClick={handleDelete}>×</DeleteButton>
          </CardActions>
        </CardHeader>
        {card.description && <CardDescription>{card.description}</CardDescription>}
        {card.priority && (
          <CardPriority>
            <PriorityBadge $color={PRIORITY_COLORS[card.priority]}>
              {card.priority}
            </PriorityBadge>
          </CardPriority>
        )}
      </CardContainer>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Редактировать задачу"
        onConfirm={handleUpdate}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Заголовок *
            </label>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Введите заголовок"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Описание
            </label>
            <TextArea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Введите описание"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Приоритет
            </label>
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value as Priority | '')}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1.5px solid #E2E8F0',
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                color: '#1E293B',
              }}
            >
              <option value="">Нет</option>
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};