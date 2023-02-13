import { useState, useEffect } from "react";
import { ListItemButton,Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import storeApi from '../api/storeApi';
import { setStore } from '../redux/features/storeSlice';




export const GetNearStore = (props) => {
  //5km以下のもの
  const NUM = 5000;
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [first, setFirst] = useState(true);
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store.value);
  const [posts, setPosts] = useState([]);
  const result = JSON.stringify(stores);
  const jsonStore = JSON.parse(result);


  useEffect(() => {
    const getstore = async () => {
      try {
        const res = await storeApi.getSearchStores();
        dispatch(setStore(res));
      } catch (err) {
        alert(err)
      }
    };
    getstore();
  }, [dispatch]);


  // ヒュベニの公式
  const hubeny = (lat1, lng1, lat2, lng2) => {
    function rad(deg) {
      return (deg * Math.PI) / 180;
    }

    // 緯度経度をラジアンに変換
    lat1 = rad(lat1);
    lng1 = rad(lng1);
    lat2 = rad(lat2);
    lng2 = rad(lng2);
    // 緯度差
    let latDiff = lat1 - lat2;
    // 経度差算
    let lngDiff = lng1 - lng2;
    // 平均緯度
    let latAvg = (lat1 + lat2) / 2.0;
    // 赤道半径
    let a = 6378137.0;
    // 第一離心率^2
    let e2 = 0.00669438002301188;
    // 赤道上の子午線曲率半径
    let a1e2 = 6335439.32708317;

    let sinLat = Math.sin(latAvg);
    let W2 = 1.0 - e2 * (sinLat * sinLat);
    // 子午線曲率半径M
    let M = a1e2 / (Math.sqrt(W2) * W2);
    // 卯酉線曲率半径
    let N = a / Math.sqrt(W2);

    let t1 = M * latDiff;
    let t2 = N * Math.cos(latAvg) * lngDiff;
    return Math.sqrt(t1 * t1 + t2 * t2);
  };

  //距離整形
  const dataShaping = (distance) => {
    let restult = Math.round(distance);
    restult = restult.toLocaleString();
    return restult;
  };

  const getSuccess = (pos) => {
    //現在地の緯度経度
    setLatitude(pos.coords.latitude);
    setLongitude(pos.coords.longitude);
  };

  //エラー
  const geoError = () => {
    console.log("取得失敗");
  };

  useEffect(() => {
    if (!props.ShowStore) {
      return;
    }
    props.setLoading(true);

    navigator.geolocation.getCurrentPosition(getSuccess, geoError, {
      enableHighAccuracy: true
    });
  }, [props.ShowStore]);

  useEffect(() => {
    if (!props.ShowStore || latitude === 0 || longitude === 0) {
      return;
    }

    let resultArray = [];
    if (jsonStore) {
      for (let i = 0; i < jsonStore.length; i++) {
        let lat2 = jsonStore[i].latitude; //軽度
        let lng2 = jsonStore[i].longitude; //緯度
        let result = hubeny(latitude, longitude, lat2, lng2);

        //50,000m以下のものを結果に出す
        if (result < NUM) {
          let resultData = jsonStore[i];
          resultData["result"] = result;
          resultArray.push(resultData);
        }
      }
      setPosts(resultArray);
      if (resultArray) {
        if (0 <= resultArray.length) {
          props.setLoading(false);
        }
      }
    } else {
      props.setLoading(false);
    }
    setFirst(false);
  }, [latitude, longitude, props.ShowStore]);

   return (
    <div>
      <p>現在位置から5km以内のラーメン二郎</p>
      {!first ? (
        <ul>
          {0 < posts.length ? (
             posts.map((item) => (
               <li key={item._id}>
                  <ListItemButton　cpmponent={Link}　to={`/store/${item._id}`}>
                    <Typography variant="body2" fontWeight="700">
                      {item.title}
                    </Typography>
                  </ListItemButton>
                <p>{item.title}</p>
                <p>現在位置との距離 : 約{dataShaping(item.result)}m</p>
              </li>
            ))
          ) : (
            <li className="empty">ラーメン二郎は近くにありません。</li>
          )}
        </ul>
      ) : (
        ""
       )}
        <ListItemButton　cpmponent={Link}　to={`/`}>
        <Typography variant="body2" fontWeight="700">
                一覧に戻る
         </Typography>
         </ListItemButton>
    </div>
  );
};
export default GetNearStore;
