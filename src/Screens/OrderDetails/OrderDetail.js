import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import Header from '../../Components/Header';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import {moderateScale} from '../../styles/responsiveSize';
import {currencyNumberFormatter} from '../../utils/commonFunction';
import {getImageUrl} from '../../utils/helperFunctions';
import styles from './styles';

export default function OrderDetail() {
  const _renderItem = ({item, index}) => {
    // return <OffersCard />;

    return (
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: moderateScale(10),
          marginVertical: moderateScale(10),
        }}>
        <View style={styles.vendorView}>
          <Text style={styles.vendorText}>{item?.vendor_name}</Text>
        </View>
        {true
          ? [1, 2].map((i, inx) => {
              if (item?.vendor_id == i?.vendor_id) {
                return (
                  <View key={inx}>
                    <View style={[styles.cartItemMainContainer]}>
                      <View style={styles.cartItemImage}>
                        <Image
                          source={imagePath.mail2}
                          style={styles.imageStyle}
                        />
                      </View>

                      <View style={styles.cartItemDetailsCon}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flex: 0.7,
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                            }}>
                            <Text
                              numberOfLines={2}
                              style={[styles.priceItemLabel2, {opacity: 0.8}]}>
                              {i?.translation?.title}
                            </Text>
                            {true
                              ? [1, 2].map((j, jnx) => {
                                  return (
                                    <View style={{flexDirection: 'row'}}>
                                      <Text
                                        style={styles.cartItemWeight2}
                                        numberOfLines={1}></Text>
                                      <Text
                                        style={styles.cartItemWeight2}
                                        numberOfLines={1}></Text>
                                    </View>
                                  );
                                })
                              : null}
                          </View>

                          <View
                            style={{
                              flex: 0.5,
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            }}>
                            <Text style={styles.cartItemPrice}>
                              {`${
                                // Number(i?.pvariant?.multiplier) *
                                currencyNumberFormatter(Number(100).toFixed(2))
                              }`}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flex: 0.5, justifyContent: 'center'}}>
                            {i?.quantity && (
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    color: colors.textGrey,
                                    fontSize: textScale(14),
                                  }}>
                                  {strings.QTY}
                                </Text>
                                <Text style={styles.cartItemWeight}>
                                  {i?.quantity}
                                </Text>
                              </View>
                            )}
                            {/* {!!i?.product_addons.length && (
                              <View>
                                <Text style={styles.cartItemWeight2}>
                                  {strings.EXTRA}
                                </Text>
                              </View>
                            )} */}
                            {/* {i?.product_addons.length
                              ? i?.product_addons.map((j, jnx) => {
                                  return (
                                    <View style={{flexDirection: 'row'}}>
                                      <Text
                                        style={styles.cartItemWeight2}
                                        numberOfLines={1}>
                                        {j.addon_title}{' '}
                                      </Text>
                                      <Text
                                        style={styles.cartItemWeight2}
                                        numberOfLines={
                                          1
                                        }>{`(${j.option_title})`}</Text>
                                    </View>
                                  );
                                })
                              : null} */}
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* {!!paramData?.showRating ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: moderateScaleVertical(5),
                          paddingHorizontal: moderateScale(10),
                        }}>
                        <StarRating
                          disabled={false}
                          maxStars={5}
                          rating={Number(i?.product_rating?.rating)}
                          // selectedStar={(rating) =>
                          //   onStarRatingPress(i, rating)
                          // }
                          fullStarColor={colors.ORANGE}
                          starSize={15}
                        />
                        {i?.product_rating?.rating ? (
                          <View>
                            <Text
                              onPress={() => rateYourOrder(i)}
                              style={[
                                styles.writeAReview,
                                {color: themeColors.primary_color},
                              ]}>
                              {strings.WRITE_A_REVIEW}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    ) : null} */}

                    <View style={styles.dashedLine} />
                  </View>
                );
              } else {
                null;
              }
            })
          : null}

        {/* offerview */}
        {/* <TouchableOpacity
          disabled={item?.couponData ? true : false}
          onPress={() => _getAllOffers(item.vendor, cartData)}
          style={styles.offersViewB}>
          {item?.couponData ? (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{flex: 0.7, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={imagePath.percent} />
                <Text
                  numberOfLines={1}
                  style={[styles.viewOffers, {marginLeft: moderateScale(10)}]}>
                  {`${strings.CODE} ${item?.couponData?.name} ${strings.APPLYED}`}
                </Text>
              </View>
              <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                <Text
                  onPress={() => _removeCoupon(item, cartData)}
                  style={[styles.removeCoupon, {color: colors.cartItemPrice}]}>
                  {strings.REMOVE}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={imagePath.percent} />
              <Text
                style={[styles.viewOffers, {marginLeft: moderateScale(10)}]}>
                {strings.APPLY_PROMO_CODE}
              </Text>
            </View>
          )}
        </TouchableOpacity> */}
        {!!Number(item?.discount_amount) && (
          <View style={styles.itemPriceDiscountTaxView}>
            <Text style={styles.priceItemLabel}>{'DISCOUNT'}</Text>
            <Text style={styles.priceItemLabel}>{`-${currencyNumberFormatter(
              Number(item?.discount_amount ? item?.discount_amount : 0).toFixed(
                2,
              ),
            )}`}</Text>
          </View>
        )}
        {!!Number(item?.delivery_fee) && (
          <View style={styles.itemPriceDiscountTaxView}>
            <Text style={styles.priceItemLabel}>{'DELIVERY CHARGES'}</Text>
            <Text style={styles.priceItemLabel}>{`${currencyNumberFormatter(
              Number(item?.delivery_fee ? item?.delivery_fee : 0).toFixed(2),
            )}`}</Text>
          </View>
        )}
        <View style={styles.itemPriceDiscountTaxView}>
          <Text style={styles.priceItemLabel2}>{'Amount'}</Text>
          <Text style={styles.priceItemLabel2}>{`${currencyNumberFormatter(
            Number(item?.payable_amount ? item?.payable_amount : 0).toFixed(2),
          )}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <WrapperContainer
      bgColor={colors.white}
      statusBarColor={colors.backgroundGrey}
      isLoading={false}>
      <Header
        reverse={false}
        headerStyle={{backgroundColor: colors.white}}
        leftIcon={imagePath.backArrow}
        centerTitle={'Order Details'}
        // onPressLeft={() => navigation.toggleDrawer()}
        // hideRight={true}
        // customCenter={() => customCenter()}
      />
      <View style={{height: 1, backgroundColor: colors.borderLight}} />
      <View style={styles.mainComponent}>
        <FlatList
          data={[1, 2, 3]}
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: colors.backgroundGrey}}
          keyExtractor={(item, index) => String(index)}
          renderItem={_renderItem}
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
      </View>
    </WrapperContainer>
  );
}
