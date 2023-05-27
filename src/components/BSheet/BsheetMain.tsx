import BottomSheet, {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {toggleBSheet, utilsState} from 'redux/features/utils/utilsSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {BackHandler} from 'react-native';

const BsheetMain = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch = useAppDispatch();

  const isShowBsheet = useAppSelector(utilsState);

  // variables
  const snapPoints = useMemo(() => {
    if (isShowBsheet.snapPoint) {
      return isShowBsheet.snapPoint;
    }

    return ['50%', '90%'];
  }, []);

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        dispatch(toggleBSheet(false));
      }
    },
    [isShowBsheet.isShowBSHeet],
  );

  useEffect(() => {
    const backAction = () => {
      bottomSheetRef?.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  // renders
  return (
    <View style={[styles.container, {height: WINDOW_HEIGHT}]}>
      <BottomSheet
        ref={bottomSheetRef}
        index={isShowBsheet.height === 'half' ? 0 : 1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}>
        <View style={styles.contentContainer}>
          {isShowBsheet?.contentBsheet && isShowBsheet?.contentBsheet}
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: 'grey',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    // bottom: 0,
    width: WINDOW_WIDTH,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BsheetMain;
