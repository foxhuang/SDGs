import { Card } from "antd";

import React from "react";
import styles from "../style.less";

const LastMonthKeepsiteRankCard = ({ data, loading }: { data: { title: string; total: number }[]; loading: boolean }) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{ padding: 0 }}
    title="上月份分館兌換獎勵數排行"
    actions={[<a href="/hycms/report/exchange?mode=2&day=lastMonth">{"進一步查看 >"}</a>]}
    style={{ height: "100%" }}
  >
    <div className={styles.salesCard}>
      <div className={styles.salesRank}>
        <ul className={styles.rankingList}>
          {data.map((item, i) => (
            <>
              {i < 6 && (
                <li key={item.title}>
                  <span className={`${styles.rankingItemNumber} ${styles.active}`}>{i + 1}</span>
                  <span className={styles.rankingItemTitle} title={item.title}>
                    {item.title}
                  </span>
                  <span className={styles.rankingItemValue}>{item.total}</span>
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  </Card>
);

export default LastMonthKeepsiteRankCard;
