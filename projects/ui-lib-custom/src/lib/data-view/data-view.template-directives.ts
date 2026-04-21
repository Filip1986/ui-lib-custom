import { Directive } from '@angular/core';

/** Marks the template used to render each list-mode DataView item. */
@Directive({ selector: '[uiDataViewListItem]', standalone: true })
export class DataViewListItemDirective {}

/** Marks the template used to render each grid-mode DataView item. */
@Directive({ selector: '[uiDataViewGridItem]', standalone: true })
export class DataViewGridItemDirective {}

/** Marks the template projected into the DataView header region. */
@Directive({ selector: '[uiDataViewHeader]', standalone: true })
export class DataViewHeaderDirective {}

/** Marks the template projected into the DataView footer region. */
@Directive({ selector: '[uiDataViewFooter]', standalone: true })
export class DataViewFooterDirective {}

/** Marks the template rendered when DataView has no items. */
@Directive({ selector: '[uiDataViewEmpty]', standalone: true })
export class DataViewEmptyDirective {}

/** Marks the template rendered while DataView is in loading state. */
@Directive({ selector: '[uiDataViewLoading]', standalone: true })
export class DataViewLoadingDirective {}

/** Marks the template projected into the left side of DataView paginator controls. */
@Directive({ selector: '[uiDataViewPaginatorLeft]', standalone: true })
export class DataViewPaginatorLeftDirective {}

/** Marks the template projected into the right side of DataView paginator controls. */
@Directive({ selector: '[uiDataViewPaginatorRight]', standalone: true })
export class DataViewPaginatorRightDirective {}
