import supabase from "../services/supabase-client";
import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Avatar,
  Text,
  Title,
  Paper,
  Group,
  Badge,
  Center,
} from "@mantine/core";
import { useAuth } from "../context/AuthContext";

export default function Leaderboard() {
  const [lead, setLead] = useState([]);
  const { session } = useAuth();

  useEffect(() => {
    fetchBoard();
  }, []);

  async function fetchBoard() {
    try {
      const { data, error } = await supabase.from("user_profiles").select(
        `
    id,
    name,
    points
    `,
      );
      if (error) {
        throw error;
      }
      const sortedData = [...data].sort((a, b) => b.points - a.points);
      setLead(sortedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  if (lead.length > 0) {
    console.log(lead);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <Card
        shadow="xl"
        radius="lg"
        p={0}
        withBorder
        style={{ width: "100%", maxWidth: 950, overflow: "hidden" }}
      >
        <Paper
          p="xl"
          radius={0}
          style={{
            background: "linear-gradient(45deg, #228be6 0%, #15aabf 100%)",
            color: "white",
          }}
        >
          <Title order={2} ta="center">
            🏆 Player Ranking
          </Title>
        </Paper>

        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          verticalSpacing="md"
          horizontalSpacing="lg"
        >
          <Table.Thead>
            <Table.Tr style={{ fontSize: "1rem" }}>
              <Table.Th ta="center">#</Table.Th>
              <Table.Th ta="center">Player</Table.Th>
              <Table.Th ta="center">Points</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {lead.map((player, index) => {
              const playerHighlight = player.id === session?.user?.id;
              return (
                <Table.Tr
                  key={index}
                  style={{
                    fontSize: "2rem",
                    background:
                      playerHighlight &&
                      "linear-gradient(45deg, #74c0fc 0%, #63e6be 100%)",
                  }}
                >
                  <Table.Td ta="center">
                    <Center style={{ width: 50, height: 50, margin: "0 auto" }}>
                      {index === 0 && "🥇"}
                      {index === 1 && "🥈"}
                      {index === 2 && "🥉"}
                      <Text style={{ fontSize: "1.5rem" }}>
                        {index > 2 && index + 1}
                      </Text>
                    </Center>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm" justify="center">
                      <Avatar
                        radius="xl"
                        size="md"
                        variant="filled"
                        color={
                          index === 0
                            ? "yellow.8"
                            : index === 1
                              ? "grey"
                              : index === 2
                                ? "#A0522D"
                                : "blue"
                        }
                      >
                        {player.name[0]}
                      </Avatar>
                      <Text size="lg" fw={index < 3 ? 600 : 400}>
                        {player.name}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group
                      justify="center"
                      align="center"
                      style={{ height: "100%" }}
                    >
                      <Badge
                        variant="gradient"
                        gradient={
                          index === 0
                            ? { from: "orange", to: "yellow" }
                            : index === 1
                              ? { from: "#434343", to: "#979797" }
                              : index === 2
                                ? { from: "#804A00", to: "#CA7345" }
                                : { from: "blue", to: "cyan" }
                        }
                        size="xl"
                      >
                        {player.points} pts
                      </Badge>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  );
}
