// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/resources/coupon.proto (package isuxportal.proto.resources, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file isuxportal/resources/coupon.proto.
 */
export declare const file_isuxportal_resources_coupon: GenFile;

/**
 * @generated from message isuxportal.proto.resources.Coupon
 */
export declare type Coupon = Message<"isuxportal.proto.resources.Coupon"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: int64 team_id = 2;
   */
  teamId: bigint;

  /**
   * @generated from field: repeated string code = 3;
   */
  code: string[];

  /**
   * @generated from field: bool activate = 4;
   */
  activate: boolean;
};

/**
 * Describes the message isuxportal.proto.resources.Coupon.
 * Use `create(CouponSchema)` to create a new message.
 */
export declare const CouponSchema: GenMessage<Coupon>;
