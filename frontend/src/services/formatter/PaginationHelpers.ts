import { LinkPagination } from '../../_metronic/helpers';

type props = {
  count: number;
  limit: number;
  page: number;
  maxLeftPagination?: number;
  maxRightPagination?: number;
};

export function PaginationHelpers({
  count,
  limit,
  page,
  maxRightPagination = 10,
}: props) {
  const paginations: Array<LinkPagination> = [];

  const maxPagination: number =
    Math.floor(count / limit) + (count % limit ? 1 : 0);
  const maxPageNumber =
    maxPagination < maxRightPagination ? maxPagination : maxRightPagination;
  let pageNumber = 1;

  let page_type: string = 'normal';

  if (maxPagination && page) {
    if (maxPagination > 10) {
      if (page < 6) {
        page_type = 'left';
      } else if (maxPagination - page < 5) {
        page_type = 'right';
      } else {
        page_type = 'midle';
      }
    }
  }

  do {
    let pageSkipStart = (pageNumber - 1) * limit;
    let active = page === pageNumber;
    let label = pageNumber.toString();
    let type = 'page';
    let currentpage: number | null = pageNumber;

    if (page_type === 'left') {
      if (pageNumber <= 6) {
        active = page === pageNumber;
      } else if (pageNumber > 7 && pageNumber <= 10) {
        if (maxPagination) {
          const currentpagenumber = maxPagination - (10 - pageNumber);
          label = currentpagenumber.toString();
          pageSkipStart = (currentpagenumber - 1) * limit;
          active = page === currentpagenumber;
        }
      } else {
        type = 'separator';
        label = '...';
        currentpage = null;
      }
    } else if (page_type === 'right') {
      if (pageNumber <= 3) {
        active = page === pageNumber;
      } else if (pageNumber >= 5 && pageNumber <= 10) {
        if (maxPagination) {
          const currentpagenumber = maxPagination - (10 - pageNumber);
          label = currentpagenumber.toString();
          pageSkipStart = (currentpagenumber - 1) * limit;
          active = page === currentpagenumber;
        }
      } else {
        type = 'separator';
        label = '...';
        currentpage = null;
      }
    } else if (page_type === 'midle') {
      if (pageNumber < 3) {
        active = page === pageNumber;
      } else if (pageNumber > 7 && pageNumber <= 10) {
        if (maxPagination) {
          const currentpagenumber = maxPagination - (10 - pageNumber);
          label = currentpagenumber.toString();
          pageSkipStart = (currentpagenumber - 1) * limit;
          active = page === currentpagenumber;
        }
      } else if (pageNumber >= 4 && pageNumber <= 6) {
        const currentposition = 5 - pageNumber;
        const pagecurrent = page - currentposition;
        label = pagecurrent.toString();
        pageSkipStart = (pagecurrent - 1) * limit;
        active = page === pagecurrent;
      } else {
        type = 'separator';
        label = '...';
        currentpage = null;
      }
    }

    const entry: LinkPagination = {
      active,
      label,
      page: currentpage,
      skip: pageSkipStart,
      limit,
      type,
    };
    paginations.push(entry);
    pageNumber++;
  } while (pageNumber <= maxPageNumber);

  return paginations;
}
