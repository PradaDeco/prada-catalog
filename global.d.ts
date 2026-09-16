import type DataTable from "datatables.net-dt";
import type Dropzone from "dropzone";
import type { JQueryStatic } from "jquery";
import type _ from "lodash";
import type noUiSlider from "nouislider";
import type { Calendar } from "vanilla-calendar-pro";

declare global {
  interface Window {
    // Optional third-party libraries
    $: JQueryStatic
    jQuery: JQueryStatic
    _: typeof _
    Dropzone: typeof Dropzone
    noUiSlider: typeof noUiSlider
    DataTable: typeof DataTable
    VanillaCalendarPro: typeof Calendar
  }
};

export { };
