import type { QueryFilters } from '@/lib/types';

export function getCustomFilter(filters: QueryFilters) {
  const isCompany = filters.company;

  if (isCompany !== undefined) {
    delete filters.company;
  }

  let customFilterQuery = '';
  if (isCompany) {
    // TODO:
    // parse company id
    const queryType = isCompany.split('.')[0];
    console.log(queryType);
    const companyId = isCompany.split('.').slice(1).join('.');
    customFilterQuery = `
      and exists (
      select 1 
      from session_data sd
      where sd.session_id = website_event.session_id 
        and sd.website_id = website_event.website_id
        and sd.data_key = 'company_id'
        and sd.string_value = '${companyId}'
    )
    `;
  }
  return customFilterQuery;
}
