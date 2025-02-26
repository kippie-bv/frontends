import { SalesChannel } from "../../system/sales-channel/SalesChannel";
import { DeliveryTime } from "../delivery/DeliveryTime";
import { OrderDelivery } from "../order/OrderDelivery";
import { Rule } from "../../content/rule/Rule";
import { ShippingMethodPrice } from "./ShippingMethodPrice";
import { Media } from "../../content/media/Media";
import { Tag } from "../../system/tag/Tag";
import { ShippingMethodTranslation } from "./ShippingMethodTranslation";
import { CustomFields } from "../../common/CustomField";

/**
 * @public
 */
export type ShippingMethod = {
  id: string;
  name: string | null;
  active: boolean;
  position?: number;
  customFields?: CustomFields;
  mediaId: string | null;
  deliveryTimeId: string;
  taxType: string;
  description: string | null;
  trackingUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  translated: ShippingMethodTranslation | null;
  deliveryTime: DeliveryTime | null;
  availabilityRule: Rule | null;
  prices: ShippingMethodPrice[];
  media: Media | null;
  tags: Tag[] | null;
  translations: ShippingMethodTranslation[] | null;
  orderDeliveries: OrderDelivery[] | null;
  salesChannelDefaultAssignments: SalesChannel[] | null;
  salesChannels: SalesChannel[] | null;
  availabilityRuleId: string;
};
