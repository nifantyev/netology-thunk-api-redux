import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getService, updateService } from '../api';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  setServiceLoadingStatus,
  setServiceSavingStatus,
  updateEditServiceProp,
} from '../actions/actionCreators';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

export default function ServiceEdit() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const loadingStatus = useAppSelector(
    (store) => store.serviceEdit.loadingStatus
  );
  const savingStatus = useAppSelector(
    (store) => store.serviceEdit.savingStatus
  );
  const service = useAppSelector((store) => store.serviceEdit.service);

  useEffect(() => {
    dispatch(setServiceLoadingStatus('idle'));
    dispatch(setServiceSavingStatus('idle'));
  }, [dispatch]);

  useEffect(() => {
    getService(Number(id));
  }, [id]);

  const handleCancel = () => {
    navigate('/services');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateService(service).then(
      () => {
        navigate('/services');
      },
      (e) => {}
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(updateEditServiceProp(name, value));
  };

  if (loadingStatus === 'pending') {
    return <Spinner />;
  }

  if (savingStatus === 'pending') {
    return <Spinner />;
  }

  return (
    <>
      {loadingStatus === 'error' && (
        <ErrorMessage message="Произошла ошибка при загрузке" />
      )}
      {savingStatus === 'error' && (
        <ErrorMessage message="Произошла ошибка при сохранении" />
      )}
      {loadingStatus === 'success' && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Название
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={service.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Стоимость
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={service.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Описание
            </label>
            <input
              type="text"
              className="form-control"
              id="content"
              name="content"
              value={service.content}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary me-1"
            onClick={handleCancel}
          >
            Отмена
          </button>
          <button type="submit" className="btn btn-primary">
            Сохранить
          </button>
        </form>
      )}
    </>
  );
}
