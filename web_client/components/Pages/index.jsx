import React from 'react'
import CrudPage from '../CrudPage'
import schema from '../../schema'

export const EmptyPage =
props => (
  <div>
    <PageHeader>Пустая страница</PageHeader>
  </div>
);

export const ClientsPage =
props => (
  <CrudPage model={'client'} schema={schema}/>
);

export const GroupsPage =
props => (
  <CrudPage model={'group'} schema={schema}/>
);

export const LocationsPage =
props => (
  <CrudPage model={'location'} schema={schema}/>
);

export const SubscriptionsPage =
props => (
  <CrudPage model={'subscription'} schema={schema}/>
);

export const TrainTypesPage =
props => (
  <CrudPage model={'traintype'} schema={schema}/>
);

export const TrainersPage =
props => (
  <CrudPage model={'trainer'} schema={schema}/>
);
